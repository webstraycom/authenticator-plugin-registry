// src/templates/default/index.jsx
function init(sdk) {
  const { React, Icons, plugin, ui, components } = sdk;
  const { Button } = components;
  const Content = () => {
    return React.createElement(
      'div',
      { className: 'flex flex-col gap-4' },
      React.createElement(
        'span',
        { className: 'text-muted-foreground text-sm' },
        'This is a simple example of a plugin, the code for which is only 40 lines! Start developing your plugin by editing the ',
        React.createElement('strong', null, 'plugins/', '{{ID}}', '/index.js'),
        'file.',
      ),
      React.createElement(
        Button,
        { className: 'w-full', onClick: () => ui.closeSheet() },
        'Start Building',
        React.createElement(Icons.ArrowRight, null),
      ),
    );
  };
  const action = {
    title: '{{LABEL}}',
    onClick: () => ui.openSheet(Content),
  };
  plugin.registerMenuAction('passwords-screen', action);
  plugin.registerMenuAction('totp-screen', action);
  plugin.registerMenuAction('tokens-screen', action);
}
export { init as default };
