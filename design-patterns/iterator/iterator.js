// JavaScript, as part of ECMAScript 6, supports the iterator pattern with any object that provides a next() method, 
// which returns an object with two specific properties: done and value.
function reverseArrayIterator(arr) {
    var index = arr.length - 1;
    return {
        next: () => index >= 0 ?
            { value: arr[index--], done: false } :
            { done: true }
    };
}
const it = reverseArrayIterator(['three', 'two', 'one']);
console.log(it.next().value); //-> 'one'
console.log(it.next().value); //-> 'two'
console.log(it.next().value); //-> 'three'
console.log(`Are you done? ${it.next().done}`); //-> true
// Iterate automatically `for...of` loops like `Array` `Map` `Set`
// by defining an object's meta @@iterator method, also referred to by Symbol.iterator.
function range(start, end) {
    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            if (start < end) {
                return { value: start++, done: false }; // #B
            }
            return { done: true, value: end }; // #B
        }
    };
}
for (let num of range(1, 5)) {
    console.log(num); // -> 1, 2, 3, 4
}
