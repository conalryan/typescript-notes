# Stack

Implementation of a LinkedList
This is the opposite of Queue.

Last in first out LIFO
You only add and remove from head.

## Interface
```typescript
type Node<T> = {
	value: T,
	prev?: Node<T>,
}

interface Stack<T> {
	length: number;

	push(item: T): void;
	pop(): T | undefined;
	peek(): T | undefined;
}
```

## Pseudo Code
A <- B <- C <- D

D is head

Stack is very useful when you think about recursion. Think about stacking plates and then removing them off the top.

## Time/Space Complexity
### Running Time
- push O(1)
- pop O(1)
- peek O(1)
