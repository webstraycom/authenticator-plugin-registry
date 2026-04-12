export default function init(sdk) {
  const { React, Icons, plugin, ui, components } = sdk;
  const { Button, InputGroup, Slider, Label, Tabs } = components;

  const Content = () => {
    const [password, setPassword] = React.useState('');
    const [length, setLength] = React.useState([16]);
    const [mode, setMode] = React.useState('complex');

    const generate = () => {
      const charsets = {
        simple: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
        complex:
          'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=',
      };
      const charset = charsets[mode];

      const array = new Uint32Array(length[0]);

      window.crypto.getRandomValues(array);

      let generatedPassword = '';
      for (let i = 0; i < length[0]; i++) {
        generatedPassword += charset.charAt(array[i] % charset.length);
      }
      setPassword(generatedPassword);
    };

    React.useEffect(() => {
      generate();
    }, [length, mode]);

    return React.createElement(
      'div',
      { className: 'flex flex-col gap-4' },

      React.createElement(
        Tabs.Tabs,
        {
          value: mode,
          onValueChange: setMode,
          className: 'w-full',
        },
        React.createElement(
          Tabs.TabsList,
          { className: 'grid w-full grid-cols-2', variant: 'line' },
          React.createElement(Tabs.TabsTrigger, { value: 'simple' }, 'Simple'),
          React.createElement(Tabs.TabsTrigger, { value: 'complex' }, 'Symbols'),
        ),
      ),

      React.createElement(
        InputGroup.InputGroup,
        null,
        React.createElement(InputGroup.InputGroupInput, {
          value: password,
          readOnly: true,
          autoFocus: true,
          placeholder: 'Generating...',
          className: 'font-mono text-lg bg-muted/20 focus-visible:ring-0 shadow-none border-r-0',
        }),
        React.createElement(
          InputGroup.InputGroupAddon,
          { align: 'inline-end' },
          React.createElement(
            Button,
            {
              type: 'button',
              variant: 'ghost',
              size: 'icon-sm',
              className: 'size-6',
              onClick: () => {
                window.navigator.clipboard.writeText(password);
                ui.notify('Password has been copied to clipboard!', 'success');
              },
            },
            React.createElement(Icons.Copy, { className: 'size-3' }),
          ),
        ),
      ),

      React.createElement(
        'div',
        { className: 'flex flex-col gap-4' },
        React.createElement(
          'div',
          { className: 'flex justify-between items-center' },
          React.createElement(
            Label,
            { className: 'text-sm text-muted-foreground' },
            'Password Length',
          ),
          React.createElement(
            'span',
            {
              className: 'text-sm text-muted-foreground',
            },
            length[0],
          ),
        ),
        React.createElement(Slider, {
          min: 8,
          max: 64,
          step: 1,
          value: length,
          onValueChange: setLength,
          className: 'py-2',
        }),
      ),

      React.createElement(
        Button,
        {
          className: 'w-full',
          onClick: generate,
        },
        'Generate Password',
      ),
    );
  };

  plugin.registerMenuAction('passwords-screen', {
    title: 'Password Generator',
    onClick: () => ui.openSheet(Content),
  });
}
