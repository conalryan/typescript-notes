# [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

## In JavaScript, arrays aren't primitives but are instead Array objects with the following core characteristics:
- JavaScript arrays are resizable and can contain a mix of different data types. (When those characteristics are undesirable, use typed arrays instead.)
- JavaScript arrays are not associative arrays and so, array elements cannot be accessed using arbitrary strings as indexes, but must be accessed using nonnegative integers (or their respective string form) as indexes.
- JavaScript arrays are zero-indexed: the first element of an array is at index 0, the second is at index 1, and so on — and the last element is at the value of the array's length property minus 1.
- JavaScript array-copy operations create shallow copies. (All standard built-in copy operations with any JavaScript objects create shallow copies, rather than deep copies).

Only years[2] or years['2'] is an actual array index. years['02'] is an arbitrary string property that will not be visited in array iteration.

## length property
- A JavaScript array's `length` property and numerical properties are connected.
- Several of the built-in array methods (e.g., `join()`, `slice()`, `indexOf()`, etc.) take into account the value of an array's `length` property when they're called.
- Other methods (e.g., `push()`, `splice()`, etc.) also result in updates to an array's `length` property.
- When setting a property on a JavaScript array when the property is a valid array index and that index is outside the current bounds of the array, the engine will update the array's `length` property accordingly.
- You can manually increasse or decrease the length simpy by chanaging the property `someArray.length = 22;`

## [Array methods and empty slots](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#array_methods_and_empty_slots)
- Empty slotsb in sparse arrays behave inconsistently between array methods.
- Generally, the older methods will skip empty slots, while newer ones treat them as undefined.
