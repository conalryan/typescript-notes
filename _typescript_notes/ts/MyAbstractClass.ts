abstract class MyAbstractClass {
    // protected access-modifier, field is visible in child but not exposed.
    // myAbstractClassImpl.myProtectedField; // result in error - not visible directly
    // myAbstractClassImpl.getMyProtectedField; // returns value - use getter to expose value
    protected imgPath = "img/";  
    name: string;
    
    constructor(public value:number) {}
 
    /**
     * Abstract method
     * The child class must implement
     * If class has an abstract method, than the entire class must be abstract
     */
    abstract myAbstractMethod(): string;
}