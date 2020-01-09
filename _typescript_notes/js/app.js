var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Can have multiple classes in a single .ts file, however it's better to keep a single class per .ts file.
 * The Compiler can combine all .ts files into a single .js file anyway so there is no benefit to combine them while
 * develeoping
 */
var MyClass = (function () {
    /**
     * Compiler creates fields automatically from this constructor
     */
    function MyClass(myNewPublicField, myNewProtectedField, myNewPrivateField) {
        var _this = this;
        this.myNewPublicField = myNewPublicField;
        this.myNewProtectedField = myNewProtectedField;
        this.myNewPrivateField = myNewPrivateField;
        this.noSemiColon = .25; // semi-colons are optional in TypeScript
        this.typeInfered = .22; // even though not declared as number, compiler knows it's a number.
        /**
         * Must have '=' after <method-name> and before ()
         * Return type is inferred if not specified
         * Arrow placed after return type if specified, or () if return type not specified
         *
         * This keyword in non-arrow function will point to the object that is calling the function
         * This keyword in arrow function will always point to the object (of the class) the function is in
         */
        this.myArrowFunction = function (someArg) {
            _this.myNumberArray.push(someArg);
            var element = document.getElementById("content");
            element.innerHTML = _this.myNumberArray.toString();
        };
        /**
         * Must return a value when not using brackets
         * Return type is optional, it will be inferred if not specified
         */
        this.myBracketlessArrowFunction = function () { return "must return something when no brackets used"; };
        // this.typeInfered = "can't be a string"; compiler knows type even if not declared. it's inferred
        this.myNumberArray = [];
        this.myNumberArray.push(myNewProtectedField);
    }
    /**
     * Return type specified after myMethod(): <return-type>
     * Return type will be inferred if not specified
     * Use this keyword everytime you are referring to a property on the class level
     * Use let keyword to block var to this method
     */
    MyClass.prototype.myMethod = function () {
        var aLocalVar = "blocked to this method";
        return "myMethod was called: " + this.myString + " " + aLocalVar;
    };
    MyClass.prototype.myVoidMethod = function () {
        this.myString = "myVoidMethod called";
    };
    /**
     * using var keyword means your are function scoped
     * JavaScript will host the result var to the top of the function.
     * This makes it accessable in the console.log in the last line of the function
     * if you use let keyword then it will be blocked scoped and console.log(result); will fail
     */
    MyClass.prototype.myFunctionScopeMethod = function () {
        var aVar = 1;
        if (aVar > 0) {
            var result = "it's greater than 1";
        }
        console.log(aVar);
        console.log(result);
    };
    // long form not needed. use get keyword
    MyClass.prototype.getMyPrivateField = function () {
        return this.myPrivateField;
    };
    Object.defineProperty(MyClass.prototype, "MyPrivateField", {
        /**
         * Getter: Use uppercase name to differentiate from field name
         * Call it:
         * var myClass = new MyClass();
         * myClass.MyPrivateField;
         */
        get: function () {
            return this.myPrivateField;
        },
        /**
         * Setter: Use uppercase name to differentiate from field name
         * Call it:
         * var myClass = new MyClass();
         * myClass.MyPrivateField = 22;
         */
        set: function (newVal) {
            this.myNumber = newVal;
        },
        enumerable: true,
        configurable: true
    });
    // long form not needed, use set keyword
    MyClass.prototype.setMyNumber = function (newVal) {
        this.myPrivateField = newVal;
    };
    /**
     * Return type specified after methodName(): <return-type>
     */
    MyClass.prototype.getImageUrl = function () {
        // relative path
        return "img/myImg";
    };
    return MyClass;
}());
/**
 * Good for adding constraints, limit options
 */
var MyEnum;
(function (MyEnum) {
    MyEnum[MyEnum["small"] = 6] = "small";
    MyEnum[MyEnum["medium"] = 9] = "medium";
    MyEnum[MyEnum["large"] = 12] = "large";
})(MyEnum || (MyEnum = {}));
/**
 * A clas can implement multipled interfaces
 *
 * It can have extra fields beyond the interface, however they will be ignored if passed into a method accepting only
 * the interface @see methodAcceptingInterface(myInterface:myInterface)
 */
var MyInterfaceImpl = (function () {
    // doesn't implement 'optionalField' since it isn't required or needed for this class
    function MyInterfaceImpl(aString, anotherString, extraField) {
        this.aString = aString;
        this.anotherString = anotherString;
        this.extraField = extraField;
    }
    return MyInterfaceImpl;
}());
/**
 * This class satisfies the MyInterface contract even though it doesn't implement it
 *
 * It can have extra fields beyond the interface, however they will be ignored if passed into a method accepting only
 * the interface @see methodAcceptingInterface(myInterface:myInterface)
 */
var MyPseudoInterfaceImpl = (function () {
    // doesn't implement 'optionalField' since it isn't required or needed for this class
    function MyPseudoInterfaceImpl(aString, anotherString, extraField) {
        this.aString = aString;
        this.anotherString = anotherString;
        this.extraField = extraField;
    }
    return MyPseudoInterfaceImpl;
}());
/// <reference path="MyClass.ts" />
/// <reference path="MyEnum.ts" />
/// <reference path="MyInterfaceImpl.ts" />
/*
 Above line(s) tell tsc compiler that this class depends on the definition(s) which are found in the above .ts files
 The transplier will place those classes before this class in the transpiled .js file
 Essentially the above class(es) need to be placed before this class otherwise this class will error
 ~ class not found exception
*/
var myClass = new MyClass("first arg", 22, true);
var myEnumSize = MyEnum.medium;
myClass.myArrowFunction(myEnumSize);
/**
 * Can accept any object that has at least the same fields and methods as the interface.
 * The object can have more fields or methods than the interface, however they will be ignored in the method
 */
function methodAcceptingInterface(myInterface) {
    // won't compile. myInterface.extraField doesn't exist
    //return "Passed in , " + myInterface.aString + " " + myInterface.anotherString, + " " + myInterface.extraField;
    return "[MyInterface.ts] args passed in: " + myInterface.aString + " " + myInterface.anotherString;
}
var myInterfaceObj = { aString: "This object satisfies", anotherString: "MyInterface contract", extraField: "This field is ignored" };
var myInterfaceImpl = new MyInterfaceImpl("This class satisfies", "MyInterface contract", "This field is ignored by interface");
var element = document.getElementById("content2");
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
var MyAbstractClass = (function () {
    function MyAbstractClass(value) {
        this.value = value;
        // protected access-modifier, field is visible in child but not exposed.
        // myAbstractClassImpl.myProtectedField; // result in error - not visible directly
        // myAbstractClassImpl.getMyProtectedFiled; // returns value - use getter to expose value
        this.imgPath = "img/";
    }
    return MyAbstractClass;
}());
/**
 * Class can only extend one other class
 */
var MyAbstractClassImpl = (function (_super) {
    __extends(MyAbstractClassImpl, _super);
    /**
     * Super constructor requires a number
     * Use super keyword to call the base class
     */
    function MyAbstractClassImpl() {
        return _super.call(this, .1) || this;
    }
    /**
     * Overriding abstract class
     */
    MyAbstractClassImpl.prototype.myAbstractMethod = function () {
        // imgPath is protected field from base class
        return this.imgPath + "/Dime.png";
    };
    return MyAbstractClassImpl;
}(MyAbstractClass));
/**
 * Experimental in TS
 * Special kind of function
 * Can be placed on Classes, methods, properties, parameters
 * Enable them in tsconfig.json
 * -> experimentalDecorators: true
 */
/**
 * Angular 2 example
 */
/*@Component({
    temmplate: "<h1>Hello {{ name }}</h1>"
})
class Angular2ComponentExample {
    name = "Angular 2 yo";
}*/ 
/// <reference path="MyInterface.ts" />
var MyFactory = (function () {
    function MyFactory() {
    }
    /**
     * static member - field, method
     * call it:
     * MyFactory.GetMyInterface();
     */
    MyFactory.GetMyInterface = function () {
        var random = Math.floor(Math.random() * 11);
        switch (random) {
            case 0: return new MyInterfaceImpl("one", "two", "three");
            case 1: return new MyInterfaceImpl("four", "five", "six");
        }
    };
    return MyFactory;
}());
/**
 * Call it:
 *  -> let stringCollection = new MyGenericClass<string>();
 *  -> transpiler will create a new class in the background
 */
var MyGenericClass = (function () {
    function MyGenericClass() {
    }
    MyGenericClass.prototype.add = function (item) {
        // add item
    };
    return MyGenericClass;
}());
var MyGenericDerivedClass = (function () {
    function MyGenericDerivedClass() {
    }
    return MyGenericDerivedClass;
}());
var MyKoObservable = (function () {
    function MyKoObservable() {
        this.koObserableField = ko.observable(0);
    }
    /**
     * This method is not needed, is only her to demo
     *
     * You can get the field simply by calling the property as a function
     * koObserableField();
     *
     * You can et the field simply by calling the property as a function
     * and passing in the new value
     * koObserableField(22);
     */
    MyKoObservable.prototype.getKoObserableField = function () {
        var oldValue = this.koObserableField();
        this.koObserableField(oldValue + 22);
    };
    return MyKoObservable;
}());
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
var MyNonExportedClass = (function () {
    function MyNonExportedClass() {
    }
    return MyNonExportedClass;
}());
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
/**
 * If you don't specify a namespace then it defaults to the global namespace
 *
 */
var MyNamespace;
(function (MyNamespace) {
    /**
     * Exported class
     * Call it with the namesapce first.
     *  -> myExportedClass = new MyNamespace.MyExportedClass();
     *
     * The .js is simply another object that wraps
     */
    var MyExportedClass = (function () {
        function MyExportedClass() {
        }
        return MyExportedClass;
    }());
    MyNamespace.MyExportedClass = MyExportedClass;
    /**
     * Non-exported class means this class is only visible within this namespace
     */
    var myNonExportedClass = (function () {
        function myNonExportedClass() {
        }
        return myNonExportedClass;
    }());
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
    var MyInnerNamespace;
    (function (MyInnerNamespace) {
        /**
         * Call it
         *      myInnerExportedClass = new MyNamespace.MyInnerNamespace.MyInnerExportedClass();
         */
        var MyInnerExportedClass = (function () {
            function MyInnerExportedClass() {
            }
            return MyInnerExportedClass;
        }());
        MyInnerNamespace.MyInnerExportedClass = MyInnerExportedClass;
    })(MyInnerNamespace = MyNamespace.MyInnerNamespace || (MyNamespace.MyInnerNamespace = {}));
})(MyNamespace || (MyNamespace = {}));
//# sourceMappingURL=app.js.map