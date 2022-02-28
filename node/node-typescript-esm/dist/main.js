import * as fsAsync from 'fs/promises';
import * as fs from 'fs';
// Dir
try {
    fs.mkdirSync('tmp');
}
catch (error) {
    console.log('dir already exists');
}
// File
fs.writeFileSync('tmp/hello', 'world');
try {
    await fsAsync.rm('tmp/hello');
    console.log('successfully deleted tmp/hello');
}
catch (error) {
    console.error('there was an error:', error.message);
}
//# sourceMappingURL=main.js.map