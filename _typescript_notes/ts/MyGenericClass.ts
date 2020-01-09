/**
 * Call it:
 *  -> let stringCollection = new MyGenericClass<string>();
 *  -> transpiler will create a new class in the background
 */
class MyGenericClass<T> {

    add(item: T) {
        // add item
    }
}

class MyGenericDerivedClass<T extends MyInterface> {
    
}