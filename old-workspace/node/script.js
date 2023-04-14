// process
// is an object that's available which is in the global scope.
// It provides information about, and control over, the current Node.js process.

console.log(process.cwd());

console.log(process.argv);

// call node script.js bob
const args = process.argv.slice(2); //  -> slice to remove first two items.
for(let arg of args){
    console.log(`Hello ${arg}`)
}

// fs Module
// Enables interacting with the file system.
import * as fs from 'fs';
