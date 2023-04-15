/**
 * Interface
 *
 * Describes objects that have a 'aString' and 'anotherString' and perhaps an 'optionalField' field.
 * In TypeScript, two types are compatible if their internal structure is compatible. This allows us to
 * implement an interface just by having the 'shape' the interface requires, without an explicit implements clause.
 */
export interface MyInterface {
    aString: string;
    anotherString: string;
    // ? (question mark) means field is optional in implementing class
    optionalField?: number;
}
