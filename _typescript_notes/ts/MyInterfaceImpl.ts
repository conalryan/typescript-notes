/**
 * A clas can implement multipled interfaces
 * 
 * It can have extra fields beyond the interface, however they will be ignored if passed into a method accepting only
 * the interface @see methodAcceptingInterface(myInterface: MyInterface)
 */
class MyInterfaceImpl implements MyInterface {

    // doesn't implement 'optionalField' since it isn't required or needed for this class

    constructor(public aString: string, public anotherString: string, public extraField: string) {}
}

/**
 * This class satisfies the MyInterface contract even though it doesn't implement it
 * 
 * It can have extra fields beyond the interface, however they will be ignored if passed into a method accepting only
 * the interface @see methodAcceptingInterface(myInterface: MyInterface)
 */
class MyPseudoInterfaceImpl { 

    // doesn't implement 'optionalField' since it isn't required or needed for this class

    constructor(public aString: string, public anotherString: string, public extraField: string) {}
}