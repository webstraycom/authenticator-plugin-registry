export default function init(sdk) {
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

    return (
      <div className="scroll-fade scroll-fade-24 flex flex-col gap-4 overflow-y-auto">
        <div className="flex flex-col gap-2">
          <h3 className="font-medium">Buttons</h3>

          <div className="flex flex-row flex-wrap gap-1.5 rounded-lg border-2 border-dashed p-4">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>

            <Button variant="outline" size="icon" aria-label="Settings">
              <Icons.CogIcon className="h-4 w-4" />
            </Button>

            <Button variant="outline" disabled>
              Disabled
            </Button>

            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>

            <Button variant="outline">
              <Icons.GitFork className="h-4 w-4" />
              With Icon
            </Button>

            <Button variant="outline">
              <Spinner className="h-4 w-4" />
              Spinner
            </Button>

            <ButtonGroup.ButtonGroup>
              <Button variant="outline" aria-label="Previous">
                <Icons.ArrowLeftIcon className="h-4 w-4" />
              </Button>
              <Button variant="outline" aria-label="Next">
                <Icons.ArrowRightIcon className="h-4 w-4" />
              </Button>
            </ButtonGroup.ButtonGroup>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-medium">Inputs</h3>

          <div className="flex flex-row flex-wrap gap-4 rounded-lg border-2 border-dashed p-4">
            <div className="flex w-full flex-col gap-2">
              <Label htmlFor="plugin-select">Select</Label>

              <Select.Select>
                <Select.SelectTrigger id="plugin-select" className="w-full">
                  <Select.SelectValue placeholder="Select a plugin" />
                </Select.SelectTrigger>
                <Select.SelectContent>
                  <Select.SelectGroup>
                    <Select.SelectLabel>Plugins</Select.SelectLabel>
                    <Select.SelectItem value="search">Search Plugin</Select.SelectItem>
                    <Select.SelectItem value="import">Import Plugin</Select.SelectItem>
                    <Select.SelectItem value="export">Export Plugin</Select.SelectItem>
                    <Select.SelectItem value="backup">Backup Plugin</Select.SelectItem>
                    <Select.SelectItem value="background">Background Plugin</Select.SelectItem>
                  </Select.SelectGroup>
                </Select.SelectContent>
              </Select.Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="input-group">Input Group</Label>

              <InputGroup.InputGroup>
                <InputGroup.InputGroupAddon>https://webstray.com/</InputGroup.InputGroupAddon>
                <InputGroup.InputGroupInput
                  id="input-group"
                  placeholder="authenticator"
                  className="!pl-0"
                />
              </InputGroup.InputGroup>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-medium">Toggles & Selectors</h3>

          <div className="flex flex-row flex-wrap items-center gap-4 rounded-lg border-2 border-dashed p-4">
            <div className="flex items-center gap-2">
              <Switch id="sw-1" />
              <Label htmlFor="sw-1">Switch</Label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="ch-1" />
              <Label htmlFor="ch-1">Checkbox</Label>
            </div>

            <RadioGroup.RadioGroup defaultValue="1" className="flex gap-4">
              <div className="flex items-center gap-1.5">
                <RadioGroup.RadioGroupItem value="1" id="r1" />
                <Label htmlFor="r1">Radio 1</Label>
              </div>

              <div className="flex items-center gap-1.5">
                <RadioGroup.RadioGroupItem value="2" id="r2" />
                <Label htmlFor="r2">Radio 2</Label>
              </div>

              <div className="flex items-center gap-1.5">
                <RadioGroup.RadioGroupItem value="3" id="r3" />
                <Label htmlFor="r3">Radio 3</Label>
              </div>
            </RadioGroup.RadioGroup>

            <Toggle variant="outline" onPressedChange={setToggleChecked}>
              <Icons.Bookmark className={cn('h-4 w-4', toggleChecked && 'fill-foreground')} />
              Toggle
            </Toggle>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-medium">Feedback & Status</h3>

          <div className="flex flex-col gap-4 rounded-lg border-2 border-dashed p-4">
            <div className="flex flex-col gap-2">
              <h4 className="font-medium">Badges</h4>

              <div className="flex flex-wrap items-center gap-1.5">
                <Badge>Primary</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="font-medium">Progress</h4>
              <Progress value={75} className="w-full" aria-label="Progress" />
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="font-medium">Kbd</h4>

              <div className="flex flex-wrap items-center gap-1">
                <Kbd.Kbd>Ctrl</Kbd.Kbd>
                <Kbd.Kbd>Alt</Kbd.Kbd>
                <Kbd.Kbd>Shift</Kbd.Kbd>

                <Kbd.Kbd aria-label="Enter">
                  <Icons.CornerDownLeft className="h-3 w-3" />
                </Kbd.Kbd>

                <Kbd.Kbd>
                  <Icons.ArrowLeftRight className="h-3 w-3" />
                  <span>Tab</span>
                </Kbd.Kbd>

                <Kbd.Kbd className="w-16">Space</Kbd.Kbd>

                <Kbd.Kbd>C</Kbd.Kbd>
                <Kbd.Kbd>V</Kbd.Kbd>
                <Kbd.Kbd>X</Kbd.Kbd>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="font-medium">Skeleton</h4>
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-medium">Complex components & Overlays</h3>

          <div className="flex flex-row flex-wrap items-center gap-4 rounded-lg border-2 border-dashed p-4">
            <div className="flex w-full flex-col gap-2">
              <h4 className="font-medium">Slider</h4>
              <Slider defaultValue={[50]} max={100} step={1} aria-label="Slider" />
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="font-medium">Overlays</h4>

              <div className="flex flex-row flex-wrap gap-1.5">
                <Tooltip.TooltipProvider>
                  <Tooltip.Tooltip>
                    <Tooltip.TooltipTrigger asChild>
                      <Button variant="outline">Tooltip</Button>
                    </Tooltip.TooltipTrigger>
                    <Tooltip.TooltipContent>This is a tooltip!</Tooltip.TooltipContent>
                  </Tooltip.Tooltip>
                </Tooltip.TooltipProvider>

                <Popover.Popover>
                  <Popover.PopoverTrigger asChild>
                    <Button variant="outline">Popover</Button>
                  </Popover.PopoverTrigger>
                  <Popover.PopoverContent align="start" className="w-fit p-2">
                    <div className="flex w-40 flex-col gap-0.5">
                      <div className="text-xs font-semibold">WebStray Authenticator</div>
                      <div className="text-xs">
                        This is a short text inside a popover component.
                      </div>
                      <div className="text-muted-foreground text-xs">Created by WebStray</div>
                    </div>
                  </Popover.PopoverContent>
                </Popover.Popover>

                <HoverCard.HoverCard openDelay={10} closeDelay={100}>
                  <HoverCard.HoverCardTrigger asChild>
                    <Button variant="outline">Hover Card</Button>
                  </HoverCard.HoverCardTrigger>
                  <HoverCard.HoverCardContent className="flex w-56 flex-col gap-0.5 rounded-lg p-2.5">
                    <div className="text-xs font-semibold">WebStray Authenticator</div>
                    <div className="text-xs">
                      This is a short text inside a hover card component.
                    </div>
                    <div className="text-muted-foreground text-xs">Created by WebStray</div>
                  </HoverCard.HoverCardContent>
                </HoverCard.HoverCard>

                <DropdownMenu.DropdownMenu>
                  <DropdownMenu.DropdownMenuTrigger asChild>
                    <Button variant="outline">Menu</Button>
                  </DropdownMenu.DropdownMenuTrigger>
                  <DropdownMenu.DropdownMenuContent align="end">
                    <DropdownMenu.DropdownMenuGroup>
                      <DropdownMenu.DropdownMenuLabel>Plugins</DropdownMenu.DropdownMenuLabel>
                      <DropdownMenu.DropdownMenuItem>Search</DropdownMenu.DropdownMenuItem>
                      <DropdownMenu.DropdownMenuItem>Import</DropdownMenu.DropdownMenuItem>
                      <DropdownMenu.DropdownMenuItem>Export</DropdownMenu.DropdownMenuItem>
                    </DropdownMenu.DropdownMenuGroup>
                  </DropdownMenu.DropdownMenuContent>
                </DropdownMenu.DropdownMenu>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-medium">Layout & Navigation</h3>

          <div className="flex flex-col gap-4 rounded-lg border-2 border-dashed p-4">
            <div className="flex flex-col gap-2">
              <h4 className="font-medium">Tabs</h4>

              <Tabs.Tabs defaultValue="import" className="w-full">
                <Tabs.TabsList variant="line" className="w-full">
                  <Tabs.TabsTrigger value="import">Import</Tabs.TabsTrigger>
                  <Tabs.TabsTrigger value="export">Export</Tabs.TabsTrigger>
                  <Tabs.TabsTrigger value="add">Add</Tabs.TabsTrigger>
                  <Tabs.TabsTrigger value="edit">Edit</Tabs.TabsTrigger>
                  <Tabs.TabsTrigger value="delete">Delete</Tabs.TabsTrigger>
                </Tabs.TabsList>
              </Tabs.Tabs>
            </div>

            <Marker.Marker variant="separator" className="shimmer">
              <Marker.MarkerIcon>
                <Icons.FolderGit2 />
              </Marker.MarkerIcon>
              <Marker.MarkerContent>Syncing plugins...</Marker.MarkerContent>
            </Marker.Marker>

            <Card.Card>
              <Card.CardHeader className="gap-0">
                <Card.CardTitle className="text-sm">Card Example</Card.CardTitle>
                <Card.CardDescription className="text-sm">
                  Here you can see list of your passwords
                </Card.CardDescription>
              </Card.CardHeader>
              <Card.CardContent>
                <div className="text-muted-foreground flex animate-pulse flex-row items-center justify-center gap-1.5 py-10">
                  <Icons.SearchIcon className="h-4 w-4" />
                  <p className="text-sm">Searching for passwords...</p>
                </div>
              </Card.CardContent>
              <Card.CardFooter className="justify-end gap-1.5 p-3">
                <Button variant="outline">Close</Button>
                <Button>Save</Button>
              </Card.CardFooter>
            </Card.Card>
          </div>
        </div>
      </div>
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
