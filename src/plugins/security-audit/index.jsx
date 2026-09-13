export default function init(sdk) {
  const { React, Icons, plugin, ui, components, db, crypto } = sdk;
  const { Button, Progress, Item, Popover } = components;

  const IssueItem = ({ item }) => (
    <Item.Item
      variant="outline"
      className="dark:bg-muted/30 rounded-lg shadow-xs dark:shadow-none"
      size="sm"
    >
      <Item.ItemMedia variant="icon" className="bg-muted border-none !p-1.5">
        <Icons.CircleAlertIcon className="h-4 w-4" />
      </Item.ItemMedia>
      <Item.ItemContent className="gap-0">
        <Item.ItemTitle className="gap-1 text-xs">{item.site}</Item.ItemTitle>
        <Item.ItemDescription className="text-[11px]">
          {item.reason === 'Too short' ? (
            <>
              Password is short: needs{' '}
              <strong className="font-semibold">{item.missingCount}</strong> more{' '}
              {item.missingCount === 1 ? 'char' : 'chars'}
            </>
          ) : item.reason === 'Duplicate' ? (
            <>
              This password reused <strong className="font-semibold">{item.count}</strong> times
            </>
          ) : (
            'This password is corrupted and cannot be read.'
          )}
        </Item.ItemDescription>
      </Item.ItemContent>
    </Item.Item>
  );

  const IssueSection = ({ title, items }) => {
    const headingId = React.useId();

    if (!items.length) return null;

    return (
      <>
        <Item.ItemGroupHeader id={headingId}>{title}</Item.ItemGroupHeader>
        <Item.ItemGroup className="flex flex-col gap-2" aria-labelledby={headingId}>
          {items.map((item) => (
            <IssueItem key={item._id} item={item} />
          ))}
        </Item.ItemGroup>
      </>
    );
  };

  const Content = () => {
    const [stats, setStats] = React.useState({
      score: 0,
      weak: [],
      reused: [],
      corrupted: [],
    });
    const [analyzing, setAnalyzing] = React.useState(true);

    const analyze = async () => {
      setAnalyzing(true);

      const passwords = await db.find({ type: 'password' });

      const decryptedData = passwords.map((p) => {
        try {
          return { ...p, decrypted: crypto.decrypt(p.value) };
        } catch {
          return { ...p, reason: 'Corrupted' };
        }
      });

      const corrupted = decryptedData.filter((p) => p.reason === 'Corrupted');
      const validPasswords = decryptedData.filter((p) => !p.reason);

      const weak = validPasswords
        .filter((p) => p.decrypted.length < 10)
        .map(({ decrypted, ...p }) => ({
          ...p,
          reason: 'Too short',
          missingCount: 10 - decrypted.length,
        }));

      const groupedByPassword = Object.groupBy(validPasswords, (p) => p.decrypted);

      const reused = Object.values(groupedByPassword)
        .filter((items) => items.length > 1)
        .flatMap((items) =>
          items.map(({ decrypted, ...item }) => ({
            ...item,
            reason: 'Duplicate',
            count: items.length,
          })),
        );

      const total = passwords.length || 1;
      const badCount = new Set([...weak, ...reused, ...corrupted].map((p) => p._id)).size;
      const score = Math.max(0, Math.round(((total - badCount) / total) * 100));

      setStats({ score, weak, reused, corrupted });
      setAnalyzing(false);
    };

    const issuesCount = stats.weak.length + stats.reused.length + stats.corrupted.length;

    React.useEffect(() => {
      analyze();
    }, []);

    return (
      <div className="flex h-full min-h-0 flex-col gap-4">
        <div className="flex shrink-0 flex-col items-center gap-2 pb-2">
          <div className="flex flex-col gap-1 text-center">
            <span className="text-2xl leading-none font-bold">{stats.score}%</span>
            <span className="text-muted-foreground text-sm">Security Score</span>
          </div>

          <Progress
            value={stats.score}
            className="h-1.5 w-full"
            aria-label={`Security score: ${stats.score}%`}
          />
        </div>

        <div
          className="scroll-fade scroll-fade-24 flex flex-1 flex-col gap-2 overflow-y-auto focus-visible:outline-none"
          tabIndex={0}
          role="region"
          aria-label="Security audit issues"
        >
          <IssueSection title="Weak Passwords" items={stats.weak} />
          <IssueSection title="Reused Passwords" items={stats.reused} />
          <IssueSection title="Corrupted Passwords" items={stats.corrupted} />

          {!analyzing && issuesCount > 0 && (
            <div className="shrink-0 py-4 text-center">
              <span className="text-muted-foreground text-xs">
                You need to fix <strong>{issuesCount}</strong>{' '}
                {issuesCount === 1 ? 'issue' : 'issues'} to get 100%!
              </span>
            </div>
          )}

          {!analyzing && issuesCount === 0 && (
            <div className="flex h-full flex-col items-center justify-center gap-2">
              <Icons.ShieldCheck className="h-8 w-8" />

              <span className="text-sm font-semibold">No Issues</span>
              <span className="text-muted-foreground text-center text-sm">
                All of your passwords
                <br />
                are healthy. Keep it up!
              </span>

              <Popover.Popover>
                <Popover.PopoverTrigger asChild>
                  <Button variant="link" className="h-6 p-0 text-sm">
                    Learn More
                  </Button>
                </Popover.PopoverTrigger>
                <Popover.PopoverContent className="flex w-56 flex-col gap-0.5 rounded-lg p-2.5">
                  <div className="text-xs font-semibold">Security Audit</div>
                  <div className="text-xs">No short or reused passwords found. Keep it up!</div>
                  <div className="text-muted-foreground mt-1 text-xs">
                    Verified on{' '}
                    {new Date().toLocaleDateString('en-US', {
                      month: 'long',
                      day: '2-digit',
                      year: 'numeric',
                    })}
                  </div>
                </Popover.PopoverContent>
              </Popover.Popover>
            </div>
          )}
        </div>
      </div>
    );
  };

  plugin.registerMenuAction('passwords-screen', {
    title: 'Security Audit',
    onClick: () => ui.openSheet(Content),
  });
}
