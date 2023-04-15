import { MyInterface } from "./MyInterface";
import { MyInterfaceImpl } from "./MyInterfaceImpl";

export class MyFactory {

    /**
     * static member - field, method
     * call it:
     * MyFactory.GetMyInterface();
     */
    static GetMyInterface(): MyInterface {
        const random = Math.floor(Math.random() * 11);
        switch(random) {
            case 0: return new MyInterfaceImpl("one", "two", "three");
            case 1: return new MyInterfaceImpl("four", "five", "six");
        }
    }
}
