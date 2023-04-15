import { MyEnum } from "./MyEnum";
import { MyInterface } from "./MyInterface";
import { MyInterfaceImpl } from "./MyInterfaceImpl";

/**
 * Can have multiple classes in a single .ts file, however it's better to keep a single class per .ts file.
 * The Compiler can combine all .ts files into a single .js file anyway so there is no benefit to combine them while
 * develeoping
 */
export class MyClass {

    // built-in types
    myString: string;
    myNumber: number;
    myBoolean: boolean;
    noSemiColon: any = .25 // semi-colons are optional in TypeScript
    typeInfered = .22; // even though not declared as number, compiler knows it's a number.

    // custom types
    myEnum: MyEnum;
    myNumberArray: number[];
    myInterface: MyInterface;
    myInterfaceImpl: MyInterfaceImpl;

    // access modifiers
    private myPrivateField;
    protected myProtectedField; // field is visible in child but not exposed, use getter to expose value
    public myPublicField;
    myDefaultPublicField; // access modifier - default to public if not specified

   /**
    * Compiler can create fields automatically from constructor args
    */
    constructor(public myNewPublicField: string, protected myNewProtectedField: number, private myNewPrivateField: boolean) {
        // this.typeInfered = "can't be a string"; compiler knows type even if not declared. it's inferred
        this.myNumberArray = [];
        this.myNumberArray.push(myNewProtectedField);
    }

    /**
     * Return type specified after myMethod(): <return-type>
     * Return type will be inferred if not specified
     * Use this keyword everytime you are referring to a property on the class level
     * Use let keyword to block scope variable to this method
     */
    myMethod(): string {
        let aLocalVar = "block scoped to this method";
        return "myMethod was called: " + this.myString + " " + aLocalVar;
    }

    myVoidMethod(): void {
        this.myString = "myVoidMethod called";
    }

    /**
     * var keyword is function scoped
     * JavaScript will 'hoist' the result var to the top of the function.
     * This makes it accessable in the console.log in the last line of the function
     * let keyword is blocked scoped and console.log(result); will fail
     */
    myFunctionScopeMethod() {
        var aVar = 1;
        if (aVar > 0) {
            var result = "it's greater than 1";
            // let result = "this message won't be printed"; // an error will be thrown
        }
        console.log(aVar);
        console.log(result);
    }

    // long form not needed. use get keyword
    getMyPrivateField() {
        return this.myPrivateField;
    }

    /**
     * Getter: Use uppercase name to differentiate from field name
     * Call it:
     * var myClass = new MyClass();
     * myClass.MyPrivateField;
     */
    get MyPrivateField() {
        return this.myPrivateField;
    }

    // long form not needed, use set keyword
    setMyNumber(newVal: number) {
        this.myPrivateField = newVal;
    }

    /**
     * Setter: Use uppercase name to differentiate from field name
     * Call it:
     * var myClass = new MyClass();
     * myClass.MyPrivateField = 22;
     */
    set MyPrivateField(newVal: number) {
        this.myNumber = newVal;
    }

    /**
     * Return type specified after methodName(): <return-type>
     */
    getImageUrl(): string {
        // relative path
        return "img/myImg";
    }

    /**
     * Must have '=' after <method-name> and before ()
     * Return type is inferred if not specified
     * Arrow placed after return type if specified, or () if return type not specified
     *
     * This keyword in non-arrow function will point to the object that is calling the function
     * This keyword in arrow function will always point to the object (of the class) the function is in
     */
    myArrowFunction = (someArg: number): void => {
        this.myNumberArray.push(someArg);
        let element = document.getElementById("content");
        element.innerHTML = this.myNumberArray.toString();
    }

    /**
     * Must return a value when not using brackets
     * Return type is optional, it will be inferred if not specified
     */
    myBracketlessArrowFunction = (): string => "must return something when no brackets used";
}
