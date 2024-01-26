# Queue

## Interface

```typescript
type QueueNode<T> = {
  value: T,
  next?: QueueNode<T>,
}

export interface IQueue<T> {
  length: number;
  enqueue(item: T): void;
  deque(): T | undefined;
  peek(): T | undefined;
}
```

This is probably the most common data structure that i have implemented in many languages. It is built on top of a Linked List. It's a __specific implementation of a [[Last Algorithms Course - Data Structure - Linked List]]__.

First in First Out (FIFO)

You only need a **single linked list**.

## Pseudo Code
A -> B -> D

Add E
this.tail.next = E.
this.tail = E.

Pop A
h = head
head = head.next
h.next = null

## Time/Space Complexity

### Running Time
- enqueue O(1)
- deque O(1)
- peek O(1)
