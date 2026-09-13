export default function init(sdk) {
  const { React, Icons, plugin, ui, components } = sdk;
  const { Button, InputGroup, Slider, Label, Tabs } = components;

  const CHARSETS = {
    simple: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    complex:
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=',
  };

  const Content = () => {
    const [password, setPassword] = React.useState('');
    const [length, setLength] = React.useState([16]);
    const [mode, setMode] = React.useState('complex');
    const [copied, setCopied] = React.useState(false);

    const copiedTimeout = React.useRef(null);

    const generate = () => {
      const charset = CHARSETS[mode];
      const array = new Uint32Array(length[0]);

      window.crypto.getRandomValues(array);

      const generatedPassword = Array.from(array, (value) => charset[value % charset.length]).join(
        '',
      );

      setPassword(generatedPassword);
      setCopied(false);
    };

    const copyPassword = async () => {
      if (!password) return;

      await window.navigator.clipboard.writeText(password);

      setCopied(true);

      clearTimeout(copiedTimeout.current);
      copiedTimeout.current = setTimeout(() => {
        setCopied(false);
      }, 1500);
    };

    React.useEffect(() => {
      generate();
    }, [length[0], mode]);

    React.useEffect(() => {
      return () => clearTimeout(copiedTimeout.current);
    }, []);

    return (
      <div className="flex flex-col gap-4">
        <Tabs.Tabs value={mode} onValueChange={setMode} className="w-full">
          <Tabs.TabsList className="w-full" variant="line">
            <Tabs.TabsTrigger value="simple">Simple</Tabs.TabsTrigger>
            <Tabs.TabsTrigger value="complex">Symbols</Tabs.TabsTrigger>
          </Tabs.TabsList>
        </Tabs.Tabs>

        <InputGroup.InputGroup>
          <InputGroup.InputGroupInput
            value={password}
            readOnly
            placeholder="Generating..."
            aria-label="Generated password"
          />

          <InputGroup.InputGroupAddon align="inline-end">
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              onClick={copyPassword}
              aria-label={copied ? 'Password copied' : 'Copy password'}
            >
              {copied ? <Icons.Check /> : <Icons.Copy />}
            </Button>
          </InputGroup.InputGroupAddon>
        </InputGroup.InputGroup>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="password-length" id="password-length-label" className="text-sm">
              Password Length
            </Label>
            <span className="text-muted-foreground text-sm">{length[0]}</span>
          </div>

          <Slider
            id="password-length"
            min={8}
            max={64}
            step={1}
            value={length}
            onValueChange={setLength}
            aria-labelledby="password-length-label"
          />
        </div>

        <Button type="button" className="mt-2 w-full" onClick={generate}>
          Generate Password
        </Button>
      </div>
    );
  };

  plugin.registerMenuAction('passwords-screen', {
    title: 'Password Generator',
    onClick: () => ui.openSheet(Content),
  });
}
