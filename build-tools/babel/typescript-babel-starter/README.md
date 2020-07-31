
https://github.com/microsoft/TypeScript-Babel-Starter

1. Add dependency/init package.json
```bash
yarn add -D typescript @babel/core @babel/cli @babel/plugin-proposal-class-properties @babel/preset-env @babel/preset-typescript
```

2. Create tsconfig
```bash
tsc --init --declaration --allowSyntheticDefaultImports --target esnext --outDir lib
```

3. Add .babelrc, src/index.ts

