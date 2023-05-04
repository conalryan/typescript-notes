import { MyClass } from './MyClass';
import { MyEnum } from './MyEnum';
import { MyInterface } from './MyInterface';
import { MyInterfaceImpl } from './MyInterfaceImpl';

/*
 Above line(s) tell tsc compiler that this class depends on the definition(s) which are found in the above .ts files
 The transplier will place those classes before this class in the transpiled .js file
 Essentially the above class(es) need to be placed before this class otherwise this class will error
 ~ class not found exception
*/

const myClass = new MyClass('first arg', 22, true);
const myEnumSize = MyEnum.medium;
myClass.myArrowFunction(myEnumSize);

/**
 * Can accept any object that has at least the same fields and methods as the interface.
 * The object can have more fields or methods than the interface, however they will be ignored in the method
 */
function methodAcceptingInterface(myInterface: MyInterface) {
  // won't compile. myInterface.extraField doesn't exist
  //return "Passed in , " + myInterface.aString + " " + myInterface.anotherString, + " " + myInterface.extraField;
  return (
    '[MyInterface.ts] args passed in: ' +
    myInterface.aString +
    ' ' +
    myInterface.anotherString
  );
}

const myInterfaceObj = {
  aString: 'This object satisfies',
  anotherString: 'MyInterface contract',
  extraField: 'This field is ignored',
};
const myInterfaceImpl = new MyInterfaceImpl(
  'This class satisfies',
  'MyInterface contract',
  'This field is ignored by interface'
);

const element = document.getElementById('content2');
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
