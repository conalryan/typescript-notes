Writing Custom Angular Builds
================================================================================
https://www.youtube.com/watch?v=BULrf2pkfJY
https://github.com/steveblue/custom-angular-build

Prereq
Java Jdk (for clojure compiler)
Node > 8.0.0 < 9.0.0 becuase scripts are using async await

Install
`yarn install`
`yarn link`

Example output
yarn link v1.19.2
success Registered "ngs".
> info You can now run `yarn link "ngs"` in the projects where you want to use this package and it will be used instead.

Build
`ngs build dev --watch`
`ngs build`
`ngs build prod`

Run


Macro View
- Template
- Styling
- Lib
- Assets
- Compile
- Bundle

Micro View
- Async process
- Config
- Events

Node Tools
- fs
- path
- exec
- spawn

Open Source Projects
- shelljs
- commander
- findup
- htmlprocessor

CLI
- api layer
- entry point index.js

Process
- Node has process object which is similar to window object on web.
`console.log(process);` in any `*.js` file to see it.
- Process has 3 stream associated with it:
  - stdio
    - Stream
    - Event emitter
    - Reads input
  - stdout
    - Stream
    - Event emitter
    - Writes output
  - stderr
    - Stream
    - Event emitter
    - Write logs and errors

List arguments
`process.argv`

Commander
Instead of processing the argv array yourself you can use commander which returns an object.

Create New App
```bash
mkdir custom-angular-build-app
cp custom-angular-build-app
ngs scaffold
yarn install
```

34:59

Now in app dir
```bash
node server
# or
node server --watch
```

Commands to build
ngs build
ngs build dev --watch
ngs build prod

List node processes
```bash
ps aux | grep node
```

```bash
kill -9 PID
```
Don't kill all node processes at once e.g. VSCode runs node processes.

common paths
- filename
- base path
- project root
- clie root
- process root
- directory of executable

Tools to Solve Common Paths
- fs
- path
- findup

fs
- work with filesystem
- check if file exists
```javascript
fs.existsSync
if (fs.existsSync(filePath))
```

path
Make a path cross platform
```javascript
const path = require('path');
// Opt.1.
path.join('node_modules', '@angular', 'core');
// Opt.2.
path.normalize('node_modules/@angular/core');
```

Current working directory
```javascript
process.cwd()
```

Directory of current running script
```javascript
__dirname
```

Returns directory name of a path
```javascript
path.dirname()
```

Return last portion of a path
get filename
get last directory
```javascript
path.basename()
```

findup
returns absolute path
travels up the filesystem until it finds the file
blocking function
```javascript
const findup = require('findup');
findup.sync(processRoot, 'ngs.config');
```

above used in `build/indes.js`

Absolute Paths
```javascript
const projectRoot = findup.sync(processRoot, 'ngs.config.js');
path.join(projectRoot, 'node_modules');
```
/Users/foo/angular-project/node_modules
C:\Users\foo\Documents\angular-project\node_modules

Dev build steps
```bash
ngs build dev
```
copy public
copy dependencies
format template
compile src

Copy Public
```bash
cp -R src/public/* build/
```

shelljs
```javascript
const shell = require('shelljs');
```

copy lib
from src/node_modules to build/lib

htmlprocessor
- Used to manage index.html.
- Used by Grunt and Gulp

ngc
`ngc -p tsconfig.dev.json`
- Angular compiler
- Wrapper around TypeScript

spawn
- Launches command in new process
- Lacks a shell like exec
- Args for cmomand are passe in Array
- Inherits the stadard IO of it's parent

Closure Compiler
- Open source Java application
- Requires Java JRE
- RESTful API
- Optimizer
- Type annotation (tsickle)
- Warnings
```java
java -jar node_modules/google-closure-compiler/compiler.jar \
 --flagfile closure.conf \
 --js_output_file build/bundle.js
```

