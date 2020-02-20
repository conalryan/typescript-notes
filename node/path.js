'use strict';

const path = require('path');

// __dirname
console.log('> [__dirname]');
console.log(__dirname);
```bash
/Users/cryan/dev/code/p/typescript/node
```

// path.resolve
console.log('> path.resolve(__dirname, \'../\'');
console.log(path.resolve(__dirname, '../'));

```bash
> path.resolve(__dirname, '../'
/Users/cryan/dev/code/p/typescript
```

// path.join
// console.log('path.join.apply(path, [_root].concat(args))');
// console.log(path.join.apply(path, [_root].concat(args));
