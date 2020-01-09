/**
 * If you don't specify a namespace then it defaults to the global namespace
 * 
 */
namespace MyNamespace {

    /**
     * Exported class
     * Call it with the namesapce first.
     *  -> myExportedClass = new MyNamespace.MyExportedClass();
     * 
     * The .js is simply another object that wraps
     */
    export class MyExportedClass {

    }

    /**
     * Non-exported class means this class is only visible within this namespace
     */
    class myNonExportedClass {

    }

    /**
     * Can nest namespaces.
     * Once again you must export it to have it visible outside this namespace
     * Call it
     *  -> MyNamespace.MyInnerNamespace.MyInnerExportedClass
     * 
     * use import keyword to shorten long namespace namesapce
     *  -> import MyNamespace.MyInnerNameSapce;
     *  -> call class 
     *     myInnerExportedClass = new MyInnerNamespace.MyInnerExportedClass();
     */
    export namespace MyInnerNamespace {

        /**
         * Call it
         *      myInnerExportedClass = new MyNamespace.MyInnerNamespace.MyInnerExportedClass();
         */
        export class MyInnerExportedClass {

        }
    }
    
}