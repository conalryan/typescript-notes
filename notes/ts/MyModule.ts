/**
 * Modules
 * To make a module, simply add export keyword to everything you want to make visible outside the module
 * 
 * Similar to namepsaces but the .ts file become the container
 * When using modules you don't use the /// reference at the top of .ts files
 * instead other files must use the import keyword.
 * All .ts files must be modules, you can't have some modules and some not, it's all or nothing
 * 
 * Module loader
 * You will need an external library to act as a module loader
 * The module loader will load the module when it's imported
 * Good for bigger projects
 * Require.js, Common.js  are 2 examples
 * Each module loader will have a selectable tsc output format
 * Dynamic loading
 * 
 * Export
 * You can place export keyword before each class you want to export or add
 * export { MyExportedClass, AnotherExportedClass, AliasedClass as difName }
 * at end of the .ts file
 * 
 * Import
 * In other files add import keyword
 * import * as AliaseName from "./MyModule"
 * import { MyExportedClass, AnotherExportedClass as AnExpClass } from "./MyModule"
 */

/**
 * Exported class
 * In other file call it 
 *  -> import * as MyExpClass from "./MyModule"
 * 
 * TODO Commented to compile - must change tsc config
 * [ts] Cannot compile modules using option 'outFile' unless the '--module' flag is 'amd' or 'system'.
 */
//export class MyExportedClass {
//
//}

/**
 * This class will not be visible outside the module
 */
class MyNonExportedClass {

}

/**
 * Can also export functions.
 * Must use function keyword
 * Add default keyword to make it the default. Only one method can be default per class
 * Import it: Don't need {} since it's the default export
 *  -> import MyExportedFunction from "./MyModule"
 * 
 * TODO Commented to compile - must change tsc config
 * [ts] Cannot compile modules using option 'outFile' unless the '--module' flag is 'amd' or 'system'.
 */
//export default function MyExportedFunction() {
//
//}
