// src/plugins/ui-kitchen/index.jsx
function init(sdk) {
  const { React, Icons, plugin, ui, components, utils } = sdk;
  const {
    Label,
    Button,
    ButtonGroup,
    InputGroup,
    Select,
    Spinner,
    Switch,
    Checkbox,
    RadioGroup,
    Toggle,
    Badge,
    Kbd,
    Progress,
    Skeleton,
    Slider,
    Tooltip,
    Popover,
    HoverCard,
    DropdownMenu,
    Tabs,
    Card,
    Marker,
  } = components;
  const { cn } = utils;
  const Content = () => {
    const [toggleChecked, setToggleChecked] = React.useState(false);
    return React.createElement(
      'div',
      { className: 'scroll-fade scroll-fade-24 flex flex-col gap-4 overflow-y-auto' },
      React.createElement(
        'div',
        { className: 'flex flex-col gap-2' },
        React.createElement('h3', { className: 'font-medium' }, 'Buttons'),
        React.createElement(
          'div',
          { className: 'flex flex-row flex-wrap gap-1.5 rounded-lg border-2 border-dashed p-4' },
          React.createElement(Button, null, 'Primary'),
          React.createElement(Button, { variant: 'secondary' }, 'Secondary'),
          React.createElement(Button, { variant: 'outline' }, 'Outline'),
          React.createElement(
            Button,
            { variant: 'outline', size: 'icon', 'aria-label': 'Settings' },
            React.createElement(Icons.CogIcon, { className: 'h-4 w-4' }),
          ),
          React.createElement(Button, { variant: 'outline', disabled: true }, 'Disabled'),
          React.createElement(Button, { variant: 'ghost' }, 'Ghost'),
          React.createElement(Button, { variant: 'destructive' }, 'Destructive'),
          React.createElement(Button, { variant: 'link' }, 'Link'),
          React.createElement(
            Button,
            { variant: 'outline' },
            React.createElement(Icons.GitFork, { className: 'h-4 w-4' }),
            'With Icon',
          ),
          React.createElement(
            Button,
            { variant: 'outline' },
            React.createElement(Spinner, { className: 'h-4 w-4' }),
            'Spinner',
          ),
          React.createElement(
            ButtonGroup.ButtonGroup,
            null,
            React.createElement(
              Button,
              { variant: 'outline', 'aria-label': 'Previous' },
              React.createElement(Icons.ArrowLeftIcon, { className: 'h-4 w-4' }),
            ),
            React.createElement(
              Button,
              { variant: 'outline', 'aria-label': 'Next' },
              React.createElement(Icons.ArrowRightIcon, { className: 'h-4 w-4' }),
            ),
          ),
        ),
      ),
      React.createElement(
        'div',
        { className: 'flex flex-col gap-2' },
        React.createElement('h3', { className: 'font-medium' }, 'Inputs'),
        React.createElement(
          'div',
          { className: 'flex flex-row flex-wrap gap-4 rounded-lg border-2 border-dashed p-4' },
          React.createElement(
            'div',
            { className: 'flex w-full flex-col gap-2' },
            React.createElement(Label, { htmlFor: 'plugin-select' }, 'Select'),
            React.createElement(
              Select.Select,
              null,
              React.createElement(
                Select.SelectTrigger,
                { id: 'plugin-select', className: 'w-full' },
                React.createElement(Select.SelectValue, { placeholder: 'Select a plugin' }),
              ),
              React.createElement(
                Select.SelectContent,
                null,
                React.createElement(
                  Select.SelectGroup,
                  null,
                  React.createElement(Select.SelectLabel, null, 'Plugins'),
                  React.createElement(Select.SelectItem, { value: 'search' }, 'Search Plugin'),
                  React.createElement(Select.SelectItem, { value: 'import' }, 'Import Plugin'),
                  React.createElement(Select.SelectItem, { value: 'export' }, 'Export Plugin'),
                  React.createElement(Select.SelectItem, { value: 'backup' }, 'Backup Plugin'),
                  React.createElement(
                    Select.SelectItem,
                    { value: 'background' },
                    'Background Plugin',
                  ),
                ),
              ),
            ),
          ),
          React.createElement(
            'div',
            { className: 'flex flex-col gap-2' },
            React.createElement(Label, { htmlFor: 'input-group' }, 'Input Group'),
            React.createElement(
              InputGroup.InputGroup,
              null,
              React.createElement(InputGroup.InputGroupAddon, null, 'https://webstray.com/'),
              React.createElement(InputGroup.InputGroupInput, {
                id: 'input-group',
                placeholder: 'authenticator',
                className: '!pl-0',
              }),
            ),
          ),
        ),
      ),
      React.createElement(
        'div',
        { className: 'flex flex-col gap-2' },
        React.createElement('h3', { className: 'font-medium' }, 'Toggles & Selectors'),
        React.createElement(
          'div',
          {
            className:
              'flex flex-row flex-wrap items-center gap-4 rounded-lg border-2 border-dashed p-4',
          },
          React.createElement(
            'div',
            { className: 'flex items-center gap-2' },
            React.createElement(Switch, { id: 'sw-1' }),
            React.createElement(Label, { htmlFor: 'sw-1' }, 'Switch'),
          ),
          React.createElement(
            'div',
            { className: 'flex items-center gap-2' },
            React.createElement(Checkbox, { id: 'ch-1' }),
            React.createElement(Label, { htmlFor: 'ch-1' }, 'Checkbox'),
          ),
          React.createElement(
            RadioGroup.RadioGroup,
            { defaultValue: '1', className: 'flex gap-4' },
            React.createElement(
              'div',
              { className: 'flex items-center gap-1.5' },
              React.createElement(RadioGroup.RadioGroupItem, { value: '1', id: 'r1' }),
              React.createElement(Label, { htmlFor: 'r1' }, 'Radio 1'),
            ),
            React.createElement(
              'div',
              { className: 'flex items-center gap-1.5' },
              React.createElement(RadioGroup.RadioGroupItem, { value: '2', id: 'r2' }),
              React.createElement(Label, { htmlFor: 'r2' }, 'Radio 2'),
            ),
            React.createElement(
              'div',
              { className: 'flex items-center gap-1.5' },
              React.createElement(RadioGroup.RadioGroupItem, { value: '3', id: 'r3' }),
              React.createElement(Label, { htmlFor: 'r3' }, 'Radio 3'),
            ),
          ),
          React.createElement(
            Toggle,
            { variant: 'outline', onPressedChange: setToggleChecked },
            React.createElement(Icons.Bookmark, {
              className: cn('h-4 w-4', toggleChecked && 'fill-foreground'),
            }),
            'Toggle',
          ),
        ),
      ),
      React.createElement(
        'div',
        { className: 'flex flex-col gap-2' },
        React.createElement('h3', { className: 'font-medium' }, 'Feedback & Status'),
        React.createElement(
          'div',
          { className: 'flex flex-col gap-4 rounded-lg border-2 border-dashed p-4' },
          React.createElement(
            'div',
            { className: 'flex flex-col gap-2' },
            React.createElement('h4', { className: 'font-medium' }, 'Badges'),
            React.createElement(
              'div',
              { className: 'flex flex-wrap items-center gap-1.5' },
              React.createElement(Badge, null, 'Primary'),
              React.createElement(Badge, { variant: 'secondary' }, 'Secondary'),
              React.createElement(Badge, { variant: 'destructive' }, 'Destructive'),
              React.createElement(Badge, { variant: 'outline' }, 'Outline'),
            ),
          ),
          React.createElement(
            'div',
            { className: 'flex flex-col gap-2' },
            React.createElement('h4', { className: 'font-medium' }, 'Progress'),
            React.createElement(Progress, {
              value: 75,
              className: 'w-full',
              'aria-label': 'Progress',
            }),
          ),
          React.createElement(
            'div',
            { className: 'flex flex-col gap-2' },
            React.createElement('h4', { className: 'font-medium' }, 'Kbd'),
            React.createElement(
              'div',
              { className: 'flex flex-wrap items-center gap-1' },
              React.createElement(Kbd.Kbd, null, 'Ctrl'),
              React.createElement(Kbd.Kbd, null, 'Alt'),
              React.createElement(Kbd.Kbd, null, 'Shift'),
              React.createElement(
                Kbd.Kbd,
                { 'aria-label': 'Enter' },
                React.createElement(Icons.CornerDownLeft, { className: 'h-3 w-3' }),
              ),
              React.createElement(
                Kbd.Kbd,
                null,
                React.createElement(Icons.ArrowLeftRight, { className: 'h-3 w-3' }),
                React.createElement('span', null, 'Tab'),
              ),
              React.createElement(Kbd.Kbd, { className: 'w-16' }, 'Space'),
              React.createElement(Kbd.Kbd, null, 'C'),
              React.createElement(Kbd.Kbd, null, 'V'),
              React.createElement(Kbd.Kbd, null, 'X'),
            ),
          ),
          React.createElement(
            'div',
            { className: 'flex flex-col gap-2' },
            React.createElement('h4', { className: 'font-medium' }, 'Skeleton'),
            React.createElement(Skeleton, { className: 'h-4 w-full' }),
          ),
        ),
      ),
      React.createElement(
        'div',
        { className: 'flex flex-col gap-2' },
        React.createElement('h3', { className: 'font-medium' }, 'Complex components & Overlays'),
        React.createElement(
          'div',
          {
            className:
              'flex flex-row flex-wrap items-center gap-4 rounded-lg border-2 border-dashed p-4',
          },
          React.createElement(
            'div',
            { className: 'flex w-full flex-col gap-2' },
            React.createElement('h4', { className: 'font-medium' }, 'Slider'),
            React.createElement(Slider, {
              defaultValue: [50],
              max: 100,
              step: 1,
              'aria-label': 'Slider',
            }),
          ),
          React.createElement(
            'div',
            { className: 'flex flex-col gap-2' },
            React.createElement('h4', { className: 'font-medium' }, 'Overlays'),
            React.createElement(
              'div',
              { className: 'flex flex-row flex-wrap gap-1.5' },
              React.createElement(
                Tooltip.TooltipProvider,
                null,
                React.createElement(
                  Tooltip.Tooltip,
                  null,
                  React.createElement(
                    Tooltip.TooltipTrigger,
                    { asChild: true },
                    React.createElement(Button, { variant: 'outline' }, 'Tooltip'),
                  ),
                  React.createElement(Tooltip.TooltipContent, null, 'This is a tooltip!'),
                ),
              ),
              React.createElement(
                Popover.Popover,
                null,
                React.createElement(
                  Popover.PopoverTrigger,
                  { asChild: true },
                  React.createElement(Button, { variant: 'outline' }, 'Popover'),
                ),
                React.createElement(
                  Popover.PopoverContent,
                  { align: 'start', className: 'w-fit p-2' },
                  React.createElement(
                    'div',
                    { className: 'flex w-40 flex-col gap-0.5' },
                    React.createElement(
                      'div',
                      { className: 'text-xs font-semibold' },
                      'WebStray Authenticator',
                    ),
                    React.createElement(
                      'div',
                      { className: 'text-xs' },
                      'This is a short text inside a popover component.',
                    ),
                    React.createElement(
                      'div',
                      { className: 'text-muted-foreground text-xs' },
                      'Created by WebStray',
                    ),
                  ),
                ),
              ),
              React.createElement(
                HoverCard.HoverCard,
                { openDelay: 10, closeDelay: 100 },
                React.createElement(
                  HoverCard.HoverCardTrigger,
                  { asChild: true },
                  React.createElement(Button, { variant: 'outline' }, 'Hover Card'),
                ),
                React.createElement(
                  HoverCard.HoverCardContent,
                  { className: 'flex w-56 flex-col gap-0.5 rounded-lg p-2.5' },
                  React.createElement(
                    'div',
                    { className: 'text-xs font-semibold' },
                    'WebStray Authenticator',
                  ),
                  React.createElement(
                    'div',
                    { className: 'text-xs' },
                    'This is a short text inside a hover card component.',
                  ),
                  React.createElement(
                    'div',
                    { className: 'text-muted-foreground text-xs' },
                    'Created by WebStray',
                  ),
                ),
              ),
              React.createElement(
                DropdownMenu.DropdownMenu,
                null,
                React.createElement(
                  DropdownMenu.DropdownMenuTrigger,
                  { asChild: true },
                  React.createElement(Button, { variant: 'outline' }, 'Menu'),
                ),
                React.createElement(
                  DropdownMenu.DropdownMenuContent,
                  { align: 'end' },
                  React.createElement(
                    DropdownMenu.DropdownMenuGroup,
                    null,
                    React.createElement(DropdownMenu.DropdownMenuLabel, null, 'Plugins'),
                    React.createElement(DropdownMenu.DropdownMenuItem, null, 'Search'),
                    React.createElement(DropdownMenu.DropdownMenuItem, null, 'Import'),
                    React.createElement(DropdownMenu.DropdownMenuItem, null, 'Export'),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
      React.createElement(
        'div',
        { className: 'flex flex-col gap-2' },
        React.createElement('h3', { className: 'font-medium' }, 'Layout & Navigation'),
        React.createElement(
          'div',
          { className: 'flex flex-col gap-4 rounded-lg border-2 border-dashed p-4' },
          React.createElement(
            'div',
            { className: 'flex flex-col gap-2' },
            React.createElement('h4', { className: 'font-medium' }, 'Tabs'),
            React.createElement(
              Tabs.Tabs,
              { defaultValue: 'import', className: 'w-full' },
              React.createElement(
                Tabs.TabsList,
                { variant: 'line', className: 'w-full' },
                React.createElement(Tabs.TabsTrigger, { value: 'import' }, 'Import'),
                React.createElement(Tabs.TabsTrigger, { value: 'export' }, 'Export'),
                React.createElement(Tabs.TabsTrigger, { value: 'add' }, 'Add'),
                React.createElement(Tabs.TabsTrigger, { value: 'edit' }, 'Edit'),
                React.createElement(Tabs.TabsTrigger, { value: 'delete' }, 'Delete'),
              ),
            ),
          ),
          React.createElement(
            Marker.Marker,
            { variant: 'separator', className: 'shimmer' },
            React.createElement(
              Marker.MarkerIcon,
              null,
              React.createElement(Icons.FolderGit2, null),
            ),
            React.createElement(Marker.MarkerContent, null, 'Syncing plugins...'),
          ),
          React.createElement(
            Card.Card,
            null,
            React.createElement(
              Card.CardHeader,
              { className: 'gap-0' },
              React.createElement(Card.CardTitle, { className: 'text-sm' }, 'Card Example'),
              React.createElement(
                Card.CardDescription,
                { className: 'text-sm' },
                'Here you can see list of your passwords',
              ),
            ),
            React.createElement(
              Card.CardContent,
              null,
              React.createElement(
                'div',
                {
                  className:
                    'text-muted-foreground flex animate-pulse flex-row items-center justify-center gap-1.5 py-10',
                },
                React.createElement(Icons.SearchIcon, { className: 'h-4 w-4' }),
                React.createElement('p', { className: 'text-sm' }, 'Searching for passwords...'),
              ),
            ),
            React.createElement(
              Card.CardFooter,
              { className: 'justify-end gap-1.5 p-3' },
              React.createElement(Button, { variant: 'outline' }, 'Close'),
              React.createElement(Button, null, 'Save'),
            ),
          ),
        ),
      ),
    );
  };
  const action = {
    title: 'UI Kitchen',
    onClick: () => ui.openSheet(Content),
  };
  plugin.registerMenuAction('passwords-screen', action);
  plugin.registerMenuAction('totp-screen', action);
  plugin.registerMenuAction('tokens-screen', action);
}
export { init as default };
