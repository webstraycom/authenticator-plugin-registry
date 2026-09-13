export default function init(sdk) {
  const { React, Icons, plugin, ui, components } = sdk;
  const { Button } = components;

  const Content = () => {
    return (
      <div className="flex flex-col gap-4">
        <span className="text-muted-foreground text-sm">
          This is a simple example of a plugin, the code for which is only 40 lines! Start
          developing your plugin by editing the <strong>plugins/{'{{ID}}'}/index.js</strong>
          file.
        </span>
        <Button className="w-full" onClick={() => ui.closeSheet()}>
          Start Building
          <Icons.ArrowRight />
        </Button>
      </div>
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
