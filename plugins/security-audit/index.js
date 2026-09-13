// src/plugins/security-audit/index.jsx
function init(sdk) {
  const { React, Icons, plugin, ui, components, db, crypto } = sdk;
  const { Button, Progress, Item, Popover } = components;
  const IssueItem = ({ item }) =>
    React.createElement(
      Item.Item,
      {
        variant: 'outline',
        className: 'dark:bg-muted/30 rounded-lg shadow-xs dark:shadow-none',
        size: 'sm',
      },
      React.createElement(
        Item.ItemMedia,
        { variant: 'icon', className: 'bg-muted border-none !p-1.5' },
        React.createElement(Icons.CircleAlertIcon, { className: 'h-4 w-4' }),
      ),
      React.createElement(
        Item.ItemContent,
        { className: 'gap-0' },
        React.createElement(Item.ItemTitle, { className: 'gap-1 text-xs' }, item.site),
        React.createElement(
          Item.ItemDescription,
          { className: 'text-[11px]' },
          item.reason === 'Too short'
            ? React.createElement(
                React.Fragment,
                null,
                'Password is short: needs',
                ' ',
                React.createElement('strong', { className: 'font-semibold' }, item.missingCount),
                ' more',
                ' ',
                item.missingCount === 1 ? 'char' : 'chars',
              )
            : item.reason === 'Duplicate'
              ? React.createElement(
                  React.Fragment,
                  null,
                  'This password reused ',
                  React.createElement('strong', { className: 'font-semibold' }, item.count),
                  ' times',
                )
              : 'This password is corrupted and cannot be read.',
        ),
      ),
    );
  const IssueSection = ({ title, items }) => {
    const headingId = React.useId();
    if (!items.length) return null;
    return React.createElement(
      React.Fragment,
      null,
      React.createElement(Item.ItemGroupHeader, { id: headingId }, title),
      React.createElement(
        Item.ItemGroup,
        { className: 'flex flex-col gap-2', 'aria-labelledby': headingId },
        items.map((item) => React.createElement(IssueItem, { key: item._id, item })),
      ),
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
    return React.createElement(
      'div',
      { className: 'flex h-full min-h-0 flex-col gap-4' },
      React.createElement(
        'div',
        { className: 'flex shrink-0 flex-col items-center gap-2 pb-2' },
        React.createElement(
          'div',
          { className: 'flex flex-col gap-1 text-center' },
          React.createElement(
            'span',
            { className: 'text-2xl leading-none font-bold' },
            stats.score,
            '%',
          ),
          React.createElement(
            'span',
            { className: 'text-muted-foreground text-sm' },
            'Security Score',
          ),
        ),
        React.createElement(Progress, {
          value: stats.score,
          className: 'h-1.5 w-full',
          'aria-label': `Security score: ${stats.score}%`,
        }),
      ),
      React.createElement(
        'div',
        {
          className:
            'scroll-fade scroll-fade-24 flex flex-1 flex-col gap-2 overflow-y-auto focus-visible:outline-none',
          tabIndex: 0,
          role: 'region',
          'aria-label': 'Security audit issues',
        },
        React.createElement(IssueSection, { title: 'Weak Passwords', items: stats.weak }),
        React.createElement(IssueSection, { title: 'Reused Passwords', items: stats.reused }),
        React.createElement(IssueSection, { title: 'Corrupted Passwords', items: stats.corrupted }),
        !analyzing &&
          issuesCount > 0 &&
          React.createElement(
            'div',
            { className: 'shrink-0 py-4 text-center' },
            React.createElement(
              'span',
              { className: 'text-muted-foreground text-xs' },
              'You need to fix ',
              React.createElement('strong', null, issuesCount),
              ' ',
              issuesCount === 1 ? 'issue' : 'issues',
              ' to get 100%!',
            ),
          ),
        !analyzing &&
          issuesCount === 0 &&
          React.createElement(
            'div',
            { className: 'flex h-full flex-col items-center justify-center gap-2' },
            React.createElement(Icons.ShieldCheck, { className: 'h-8 w-8' }),
            React.createElement('span', { className: 'text-sm font-semibold' }, 'No Issues'),
            React.createElement(
              'span',
              { className: 'text-muted-foreground text-center text-sm' },
              'All of your passwords',
              React.createElement('br', null),
              'are healthy. Keep it up!',
            ),
            React.createElement(
              Popover.Popover,
              null,
              React.createElement(
                Popover.PopoverTrigger,
                { asChild: true },
                React.createElement(
                  Button,
                  { variant: 'link', className: 'h-6 p-0 text-sm' },
                  'Learn More',
                ),
              ),
              React.createElement(
                Popover.PopoverContent,
                { className: 'flex w-56 flex-col gap-0.5 rounded-lg p-2.5' },
                React.createElement(
                  'div',
                  { className: 'text-xs font-semibold' },
                  'Security Audit',
                ),
                React.createElement(
                  'div',
                  { className: 'text-xs' },
                  'No short or reused passwords found. Keep it up!',
                ),
                React.createElement(
                  'div',
                  { className: 'text-muted-foreground mt-1 text-xs' },
                  'Verified on',
                  ' ',
                  /* @__PURE__ */ new Date().toLocaleDateString('en-US', {
                    month: 'long',
                    day: '2-digit',
                    year: 'numeric',
                  }),
                ),
              ),
            ),
          ),
      ),
    );
  };
  plugin.registerMenuAction('passwords-screen', {
    title: 'Security Audit',
    onClick: () => ui.openSheet(Content),
  });
}
export { init as default };
