# Linked List

## Single Linked List Interface
```typescript
type SingleLinkedNode<T> = {
  value: T,
  next?: SingleLinkedNode<T>,
}

interface SingleLinkedList<T> {
  length: number; // not really needed

  add(t: T): void;
  /** aka insertAt */
  add(index: number, t T): void;
  append(t: T): void;
  contains(t: T): boolean;
  get(index: number): T | undefined;
  head(): T | undefined;
  peek(): T | undefined;
  prepend(t: T): void;
  removeAt(index: number): T | undefined;
  remove(t: T): T | undefined;
  set(index: number, t: T): void;
  tail(): T | undefined;
}
```

### Queuue Interface
```typescript
type SingleLinkedNode<T> = {
  value: T,
  next?: SingleLinkedNode<T>,
}

interface Queue<T> {
    length: number; // not really needed
    private head?: SingleLinkedNode<T>;
    private tail?: SingleLinkedNode<T>;

    enqueue(item: T): void;
    deque(): T | undefined;
    peek(): T | undefined;
}
```

### Stack Interface
```typescript
type SingleLinkedNode<T> = {
	value: T,
	prev?: SingleLinkedNode<T>,
}

interface Stack<T> {
	length: number; // not really needed

	push(item: T): void;
	pop(): T | undefined;
	peek(): T | undefined;
}
```

You have a node with a value and a pointer to the next node.
Deletion and insertion can be very fast O(1).

A -> B -> C -> D

get(i) you must walk each node until you find the value.

## Single Linked List
You can only walk forward.

### Pseudo code
Node\<T\>
	value: T;
	next?: Node\<T\>;

## Double Linked List
You can walk forward or backwards

### Pseudo code
Node\<T\>
	value: T;
	next?: Node\<T\>;
	prev?: Node\<T\>;

Ordering of operations is extremely import when setting prev and next. You don't want to loose the reference you need to use.

To delete you must set both next and prev to null
e.g. c.prev = c.next = null;

Never return the node, always return the value. Otherwise, someone code mess with the next and prev and break the linked list.

## Time / Space Complexity
- prepend / append O(1)
- Insertion in the middle O(n)
- Deletion from ends O(1)
- Deletion in the middle O(n)
- Get head / tail O(1)
- Get in general O(n)
