![Plugin Registry Preview](.github/assets/og.png)

# Plugin Registry

The official monorepo and registry for [WebStray Authenticator](https://github.com/webstraycom/authenticator) plugins.

## About

Plugin Registry is the centralized repository for official and community-driven plugins for [WebStray Authenticator](https://github.com/webstraycom/authenticator).

## Structure

The following tree outlines the repository structure:

```text
.
├── src/
│   ├── plugins/          # Plugin source code
│   └── templates/        # Template source code
├── plugins/              # Compiled plugins
├── templates/            # Compiled templates
├── scripts/              # Registry build and maintenance scripts
├── package.json          # Project configuration
└── registry.json         # Auto-generated plugin registry file
```

## Documentation

Detailed documentation for Plugin Registry is available on the [official WebStray website](https://webstray.com/docs/authenticator/plugins).

## Setup & Usage

You can add plugins to WebStray Authenticator in the following ways:

### CLI (Recommended)

Using [WebStray CLI](https://github.com/webstraycom/cli), you can add any plugin with just one command:

```bash
webstray authenticator add
```

This command will start an interactive plugin setup process.

After adding the plugin(s), don't forget to enable them in WebStray Authenticator under "Settings" -> "Plugins".

### Manual

You can add a plugin manually without using the CLI. To do this, follow these steps:

1. Download the folder with the plugin you need from the [`/plugins`](/plugins) directory.
2. Open WebStray Authenticator and go to "Settings" -> "Plugins".
3. In the plugin management dialog, click the link to open the application's plugins directory.
4. Copy the plugin folder into the application's plugins directory.
5. The plugin will be automatically detected and appear in the plugin management dialog.
6. Enable the plugin in the plugin management dialog and close the dialog.

## Development

You can develop your own plugins using your preferred tools and workflow. WebStray Authenticator loads plugins as JavaScript modules, so your development workflow must produce compatible JavaScript.

For registry contributions, plugin source can be written in JavaScript, JSX, TypeScript, or TSX. The registry build process compiles and bundles these source files into JavaScript in the `/plugins` directory.

### CLI (Recommended)

Using [WebStray CLI](https://github.com/webstraycom/cli), you can create a starting template for a new plugin with just one command:

```bash
webstray authenticator create
```

This command will start an interactive process and prompt you to specify the plugin ID, name, and author. It will then generate a basic JavaScript plugin template using `React.createElement`.

You can use this template as a starting point for developing your plugin. Since it uses plain JavaScript, it can be tested directly in WebStray Authenticator without an additional build setup.

If you prefer JSX, TSX, or TypeScript, you can use your own build setup to compile your source into JavaScript before testing it in WebStray Authenticator.

### Manual

> [!TIP]
>
> You can use one of the templates from the [`/templates`](/templates) directory as a starting point for your new plugin.

To create a new plugin, follow these steps:

1. Open WebStray Authenticator and go to "Settings" -> "Plugins".
2. In the plugin management dialog, click the link to open the application's plugins directory.
3. Inside the plugins directory, create a directory named `<your-plugin-name>`.
4. Inside it, create:
   - `package.json`: must include a unique `"id"` field.
   - `index.js`: must provide a `default export` function that accepts an `sdk` object.
5. Enable the plugin in the plugin management dialog.
6. Verify that your menu action or UI sheet is available.

## Local Setup

If you want to build the registry locally or contribute to its core logic, follow these steps.

### Clone the repository

```bash
git clone https://github.com/webstraycom/authenticator-plugin-registry.git
cd authenticator-plugin-registry
```

### Install dependencies

```bash
npm install
```

### Build

Plugin and template source files are stored in `src/` and compiled into JavaScript in the `plugins/` and `templates/` directories.

The build process also regenerates `registry.json` and formats the repository.

To build the complete registry, run:

```bash
npm run build
```

You can also run individual steps separately:

```bash
# Compile plugins and templates
npm run compile

# Generate registry.json
npm run registry

# Format the repository
npm run format
```

## Contributing

We welcome community contributions! To add your plugin to the official registry:

1. **Fork** this repository.
2. Place your plugin source in the `/src/plugins` folder.
3. Ensure your `package.json` is correctly filled out.
4. Submit a **Pull Request** with a brief description of your plugin.
5. By submitting a Pull Request, you agree that your contribution will be licensed under the project's **MIT License**.

> [!IMPORTANT]
>
> You do not need to update the compiled files in `/plugins` or `registry.json` manually. The maintainers will regenerate them during the review and merge process.

## Disclaimer

**All plugins in this registry are provided "as is", without warranty of any kind.**

By using the contents of this repository, you acknowledge and agree that:

1. **User Responsibility:** You are solely responsible for the safety of your environment and sensitive data.
2. **Plugin Status:** Inclusion of any plugin in this registry does not imply endorsement, approval, or a guarantee of safety, including those marked as "Official".
3. **Potential Risks:** Any plugin, regardless of its origin or status, has the technical capability to access decrypted data and could potentially pose a security threat. Use them at your own risk.
4. **No Liability:** The developers and maintainers of this registry shall not be held liable for any data loss, hardware damage, or security breaches resulting from the use of this software.
5. **Audit Required:** Always audit the source code of any plugin before adding it. We do not guarantee the security or stability of any contributions.

**Maintain secure backups and never use plugins you do not fully trust.**

## License

This project is licensed under the **MIT License**. See the [LICENSE](/LICENSE) file for details.
