# Template Electron-Vite

This is a customized Electron application template with React, TypeScript, TailwindCSS, and FontAwesome.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Getting Started

### 1. Create a Project using `degit`

Instead of cloning the repository, use `degit` to download a copy of the template without the git history.

```bash
# Replace <user>/<repo> with this repository's path
npx degit <user>/<repo> my-electron-app
cd my-electron-app
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Project Information

Run the built-in script to update the project name, description, author, appId, and other configurations in `package.json`, `electron-builder.yml`, etc.

```bash
pnpm update-info
```

## Development

```bash
pnpm dev
```

## Dependency Management

To easily update dependencies to their latest versions, use `npm-check-updates` (ncu).

1.  **Install `npm-check-updates`** (if not installed):

    ```bash
    npm install -g npm-check-updates
    ```

2.  **Update dependencies**:

    ```bash
    ncu -u
    pnpm install
    ```

## Build

```bash
# For windows
pnpm build:win

# For macOS
pnpm build:mac

# For Linux
pnpm build:linux
```
