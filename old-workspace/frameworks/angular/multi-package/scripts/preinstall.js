let fs = require('fs');
let resolve = require('path').resolve;
let join = require('path').join;
let cp = require('child_process');

// get library path
let packages = resolve(__dirname, '../src/app/packages/');

fs.readdirSync(packages)
  .forEach(function (mod) {
    let modPath = join(packages, mod);
    
    // ensure path has package.json
    if (!fs.existsSync(join(modPath, 'package.json'))) return;
    
    // install folder
    cp.spawn('npm', ['install'], { env: process.env, cwd: modPath, stdio: 'inherit' })
  });
