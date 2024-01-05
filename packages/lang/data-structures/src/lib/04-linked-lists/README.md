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
