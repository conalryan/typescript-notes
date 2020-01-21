/// <reference path="MyClass.ts" />
/// <reference path="MyEnum.ts" />
/// <reference path="MyInterfaceImpl.ts" />
/*
 Above line(s) tell tsc compiler that this class depends on the definition(s) which are found in the above .ts files
 The transplier will place those classes before this class in the transpiled .js file
 Essentially the above class(es) need to be placed before this class otherwise this class will error 
 ~ class not found exception
*/

let myClass = new MyClass("first arg", 22, true);
let myEnumSize = MyEnum.medium
myClass.myArrowFunction(myEnumSize);

/**
 * Can accept any object that has at least the same fields and methods as the interface.
 * The object can have more fields or methods than the interface, however they will be ignored in the method
 */
function methodAcceptingInterface(myInterface: MyInterface) {
    // won't compile. myInterface.extraField doesn't exist
    //return "Passed in , " + myInterface.aString + " " + myInterface.anotherString, + " " + myInterface.extraField;
    return "[MyInterface.ts] args passed in: " + myInterface.aString + " " + myInterface.anotherString;
}

var myInterfaceObj = { aString: "This object satisfies", anotherString: "MyInterface contract", extraField: "This field is ignored" };
var myInterfaceImpl = new MyInterfaceImpl("This class satisfies", "MyInterface contract", "This field is ignored by interface");

let element = document.getElementById("content2");
element.innerHTML = methodAcceptingInterface(myInterfaceObj);

/*=====================================================================================================================
 Maintained by Microsoft

 Write code for Node or Browser, then transpile to javascript

 npm install -g typescript

 Transpiler
 TypeScript > TSC > JavaScript

 run command:
 $ tsc someTypeScriptClass.ts

 vs code
 
 search tasks
 cmd + shift + p

 build
 cmd + shift + b

 bootstrapper.js
 is entry point into application, it starts the application, instantiate classes, setup databinding etc

 Type definitions
 TypeScipt contains typing for standard JavaScript objects
 definitelytype.org
 
 You don't need to add references (i.e. /// reference) to the type of .ts files for Type defintions.
 The transpiler automatically finds them if they are located in the project structure

 --------------------------------------------------------------------------------------------------------------------*/