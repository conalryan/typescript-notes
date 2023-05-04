/**
 * Exported class
 * Call it with the namesapce first.
 *  -> myExportedClass = new MyNamespace.MyExportedClass();
 *
 * The .js is simply another object that wraps
 */
export class MyExportedClass {}

/**
 * Non-exported class means this class is only visible within this namespace
 */
class myNonExportedClass {}
