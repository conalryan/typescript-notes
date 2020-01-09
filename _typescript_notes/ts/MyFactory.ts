/// <reference path="MyInterface.ts" />

class MyFactory {

    /**
     * static member - field, method
     * call it:
     * MyFactory.GetMyInterface(); 
     */
    static GetMyInterface(): MyInterface {
        let random = Math.floor(Math.random() * 11);
        switch(random) {
            case 0: return new MyInterfaceImpl("one", "two", "three");
            case 1: return new MyInterfaceImpl("four", "five", "six");           
        }
    }  
}