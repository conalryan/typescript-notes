# [nrwl nx](https://github.com/nrwl/nx)

# [Getting Started](https://nx.dev/angular/getting-started/getting-started)

## Creating the workspace
You get started with Nx by running a command that uses your package manager to setup your initial workspace.

Using npx
```bash
npx create-nx-workspace@latest myworkspace
```

Using npm init
```bash
npm init nx-workspace myworkspace
```

Using yarn create
```bash
yarn create nx-workspace myworkspace
# underneath the hood: Creating a sandbox with Nx...new nx-wk-du --preset="empty" --collection=@nrwl/workspace
```

## Adding to an Existing Angular CLI workspace
If you already have a regular Angular CLI project, you can add Nx power-ups by running:
```bash
ng add @nrwl/workspace
```

## Adding Capabilities
If you haven't specified any presets, you will get an empty Nx workspace. There are no applications to build, serve, and test. You can run the following to add capabilities to the workspace:

Using ng add
```bash
ng add @nrwl/angular # Adds Angular capabilities
ng add @nrwl/web # Adds Web capabilities
ng add @nrwl/react # Adds React capabilities
ng add @nrwl/node # Adds Node capabilities
ng add @nrwl/express # Adds Express capabilities
ng add @nrwl/nest # Adds Nest capabilities
```

## Creating an application
```bash
ng g @nrwl/angular:application myapp
```

## Serving an Application
To serve the newly generated application, run:
```bash
nx serve myap
```

## [Full-Stack Development](https://nx.dev/angular/getting-started/nx-and-cli#full-stack-development)


## Tutorial
https://nx.dev/angular/tutorial/01-create-application
