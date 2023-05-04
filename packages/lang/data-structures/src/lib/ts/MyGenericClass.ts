import { MyInterface } from './MyInterface';

/**
 * Call it:
 *  -> let stringCollection = new MyGenericClass<string>();
 *  -> transpiler will create a new class in the background
 */
export class MyGenericClass<T> {
  add(item: T) {
    // add item
  }
}

export class MyGenericDerivedClass<T extends MyInterface> {}
