import { getSearchScore } from './search';

export default function init(sdk) {
  const { React, Icons, plugin, ui, components, db, crypto, utils } = sdk;
  const { Button, InputGroup, Item } = components;
  const { sorter, cn, getTOTP } = utils;

  const getMeta = (item) => {
    const config = {
      password: {
        icon: Icons.LockIcon,
        title: item.site,
        description: item.login,
      },
      totp: {
        icon: Icons.ClockIcon,
        title: item.service,
        description: item.account,
      },
      token: {
        icon: Icons.KeyRoundIcon,
        title: item.service,
        description: item.endpoint,
      },
    };

    return config[item.type];
  };

  const CopyButton = ({ result, isCorrupted }) => {
    const [copied, setCopied] = React.useState(false);
    const timerRef = React.useRef(null);

    React.useEffect(
      () => () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      },
      [],
    );

    const handleCopy = async (event) => {
      event.stopPropagation();

      try {
        let value = result.decryptedValue;

        if (result.type === 'totp') {
          const totp = getTOTP(result.decryptedValue, Date.now());
          value = typeof totp === 'object' ? totp.token : totp;
        }

        await navigator.clipboard.writeText(String(value));

        clearTimeout(timerRef.current);
        setCopied(true);

        timerRef.current = setTimeout(() => {
          setCopied(false);
          timerRef.current = null;
        }, 1500);
      } catch (error) {
        console.error('Failed to copy value:', error);
        ui.notify('Copy Error', 'error');
      }
    };

    return (
      <Button
        variant="outline"
        size="xs"
        disabled={isCorrupted}
        onClick={handleCopy}
        aria-label={copied ? 'Copied secret' : 'Copy secret'}
      >
        {copied && <Icons.Check />}
        <span>{copied ? 'Copied' : 'Copy'}</span>
      </Button>
    );
  };

  const ListItem = ({ result }) => {
    const meta = getMeta(result);
    const isCorrupted = !!result.isCorrupted;
    const Icon = isCorrupted ? Icons.CircleAlertIcon : meta.icon;

    return (
      <Item.Item
        variant="outline"
        size="sm"
        className={cn(
          'dark:bg-muted/30 gap-2 rounded-lg shadow-xs dark:shadow-none',
          isCorrupted && 'opacity-50',
        )}
      >
        <Item.ItemMedia variant="icon" className="bg-muted border-none !p-1.5">
          <Icon />
        </Item.ItemMedia>

        <Item.ItemContent className="gap-0">
          {!isCorrupted && <Item.ItemTitle className="gap-1 text-xs">{meta.title}</Item.ItemTitle>}

          <Item.ItemDescription className={cn('text-[11px]', isCorrupted && 'pt-1')}>
            {isCorrupted ? (
              <>
                Value for <strong>{meta.title}</strong> is corrupted.
              </>
            ) : (
              meta.description
            )}
          </Item.ItemDescription>
        </Item.ItemContent>

        <Item.ItemActions>
          <CopyButton result={result} isCorrupted={isCorrupted} />
        </Item.ItemActions>
      </Item.Item>
    );
  };

  const ResultGroup = ({ title, items }) => {
    const headingId = React.useId();

    if (!items.length) return null;

    return (
      <>
        {title && <Item.ItemGroupHeader id={headingId}>{title}</Item.ItemGroupHeader>}
        <Item.ItemGroup
          className="flex flex-col gap-3"
          aria-labelledby={title ? headingId : undefined}
        >
          {items.map((result) => (
            <ListItem key={result._id} result={result} />
          ))}
        </Item.ItemGroup>
      </>
    );
  };

  const Content = () => {
    const [query, setQuery] = React.useState('');
    const [results, setResults] = React.useState({
      active: [],
      corrupted: [],
    });
    const [searching, setSearching] = React.useState(false);

    const resultsId = React.useId();

    const performSearch = async (text) => {
      setQuery(text);

      const searchQuery = text.trim();

      if (!searchQuery) {
        setResults({
          active: [],
          corrupted: [],
        });
        setSearching(false);
        return;
      }

      setSearching(true);

      try {
        const data = await db.find({
          type: {
            $in: ['password', 'totp', 'token'],
          },
        });

        const searchResults = (data || [])
          .map((item) => {
            try {
              const decryptedValue = crypto.decrypt(item.value);

              return {
                ...item,
                decryptedValue,
                isCorrupted: decryptedValue == null,
                searchScore: getSearchScore(searchQuery, item),
              };
            } catch {
              return {
                ...item,
                isCorrupted: true,
                searchScore: getSearchScore(searchQuery, item),
              };
            }
          })
          .filter((item) => item.searchScore > 0)
          .sort(
            (firstResult, secondResult) =>
              secondResult.searchScore - firstResult.searchScore ||
              sorter(firstResult, secondResult),
          );

        setResults(
          searchResults.reduce(
            (groups, result) => {
              groups[result.isCorrupted ? 'corrupted' : 'active'].push(result);

              return groups;
            },
            {
              active: [],
              corrupted: [],
            },
          ),
        );
      } catch (error) {
        console.error('Search failed:', error);

        setResults({
          active: [],
          corrupted: [],
        });
      } finally {
        setSearching(false);
      }
    };

    const totalResultCount = results.active.length + results.corrupted.length;
    const hasSearchQuery = query.trim().length > 0;

    return (
      <div className="flex min-h-0 flex-1 flex-col gap-4">
        <InputGroup.InputGroup className="shrink-0">
          <InputGroup.InputGroupAddon>
            <Icons.Search />
          </InputGroup.InputGroupAddon>

          <InputGroup.InputGroupInput
            placeholder="Search everywhere..."
            value={query}
            onChange={(event) => performSearch(event.target.value)}
            className="border-none shadow-none focus-visible:ring-0"
            aria-label="Search passwords, TOTP codes and tokens"
            aria-controls={resultsId}
          />

          <InputGroup.InputGroupAddon align="inline-end" aria-live="polite" aria-atomic="true">
            {totalResultCount} {totalResultCount === 1 ? 'result' : 'results'}
          </InputGroup.InputGroupAddon>
        </InputGroup.InputGroup>

        <div
          id={resultsId}
          className="scroll-fade scroll-fade-24 min-h-0 flex-1 overflow-y-auto focus-visible:outline-none"
          tabIndex={0}
          role="region"
          aria-label="Search results"
        >
          {!hasSearchQuery ? (
            <div className="text-muted-foreground flex h-full flex-col items-center justify-center gap-2 rounded-lg">
              <Icons.SparklesIcon />
              <span className="text-sm">Start typing to search...</span>
            </div>
          ) : totalResultCount === 0 && !searching ? (
            <div className="text-muted-foreground flex h-full flex-col items-center justify-center gap-2 rounded-lg">
              <Icons.FrownIcon />
              <span className="text-sm">Nothing found</span>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <ResultGroup items={results.active} />
              <ResultGroup title="Corrupted Items" items={results.corrupted} />
            </div>
          )}
        </div>
      </div>
    );
  };

  const action = {
    title: 'Global Search',
    icon: Icons.Search,
    onClick: () => ui.openSheet(Content),
  };

  plugin.registerMenuAction('passwords-screen', action);
  plugin.registerMenuAction('totp-screen', action);
  plugin.registerMenuAction('tokens-screen', action);
}
