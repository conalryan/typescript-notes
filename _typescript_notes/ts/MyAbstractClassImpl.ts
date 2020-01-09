/**
 * Class can only extend one other class
 */
class MyAbstractClassImpl extends MyAbstractClass {
    
    /**
     * Super constructor requires a number
     * Use super keyword to call the base class
     */
    constructor() {
        super(.1);
    }
    
    /**
     * Overriding abstract class
     */
    myAbstractMethod () {
        // imgPath is protected field from base class
        return this.imgPath + "/Dime.png";
    }
}