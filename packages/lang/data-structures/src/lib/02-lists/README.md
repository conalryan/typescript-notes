# List aka ArrayList aka Vector

## Interface

```typescript
export interface IArrayList<T> {
  length: number;
  append(item: T): void;
  get(idx: number): T | undefined;
  insertAt(item: T, idx: number): void;
  prepend(item: T): void;
  remove(item: T): T | undefined;
  removeAt(idx: number): T | undefined;
}
```
Uses both length and capacity. The capacity is the total space/size allocated and length is the number of actual elements stored.

In theory you don't need to cleanup the memory once you pop because you're length will tell you what you own. It depends on the language though it you're using a shared pointer in Rust. Or in Java you may want to null the value so it will be garbage collected.

Once length is equal to the capacity and you want to push another value, you will need to create a new array (typically double the size) and copy all values over to the new array.

I've never seen a data structure reduce it's memory once it grows. It's possible but I've never seen it in practice.

__enqueue__ and __deque__ of an ArrayList is __O(n)__ because all the values must be copied one by one over.

ArrayLists are really good at push and pop, but terrible at enqueue and deque. Deleting in the middle of an ArrayList is also O(n) because everything needs to shift to fill in the deleted element.

## Time Complexity
- Push to array list is O(1) within it's capacity.
- Pop is O(1).
- Enqueue is O(n).
- Deque is O(n).
- Delete is O(n) because elements will need to shift to fil in space.

## Array vs List
### Array
- a very fundamental, low-level data structure
- contigious storage, consider an array just one strip of data
- fixed size, never changes!
- write to arrays with a[index] = value
- read from arrays with let x = a[index]
- any manipulations we want to do (like inserting a value in the middle) we must code manually

### List
- A data-structure built out of an array
- Appears to have a "squishy" size where elements can be added and removed
- supports operations like (get, set, remove, insert)
  - let x = ll.get(index)
  - ll.set(index, value)
  - ll.removeFromIndex(index)
  - ll.insertAtIndex(index, value)

### Array Running Time
- Get O(1)
- Deletion/Insertion at beginning of list O(1)
- Deletion/Insertion in the middle O(1)
- Deletion/Insertion at end of list O(1)

Arrays have indice access so it's very fast.
Arrays don't have insert, it's actually a write and it will overwrite the value.
Arrays are O(1) for everything.
Arrays must be initialized to the size of memory you want to use.

Linked List does not allocate any memory until it's needed so it will always use less memory.

### Contrast
- Usability
	- Linked List you must always traverse to search therefore search is always linear in linked list. So if you need random access you should use a list. If you only need to push/pop from the head/tail then use a Linked List.
- Time
- Space
