import * as fsAsync from 'fs/promises';
import * as fs from 'fs';

import { unlink } from 'fs/promises';

// Dir
try {
  fs.mkdirSync('tmp');
} catch (error: any) {
  console.log('dir already exists');
}

// File
fs.writeFileSync('tmp/hello', 'world');

try {
  await fsAsync.rm('tmp/hello');
  console.log('successfully deleted tmp/hello');
} catch (error: any) {
  console.error('there was an error:', error.message);
}

// Example project setup
const folderName = process.argv[2] || 'Project'

try {
  fs.mkdirSync(folderName);
  fs.writeFileSync(`${folderName}/index.html`, '');
  fs.writeFileSync(`${folderName}/style.css`, '');
  fs.writeFileSync(`${folderName}/app.js`, '');
} catch (err) {
  console.log(`Error!`);
  console.log(err)
}