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

export class Queue<T> implements IQueue<T> {
  length: number;
  private head?: QueueNode<T>;
  private tail?: QueueNode<T>;

  constructor() {
    this.length = 0;
    this.head = this.tail = undefined;
  }

  enqueue(item: T): void {
    const node = { value: item } as QueueNode<T>;
    this.length++;

    if (!this.tail) {
      this.head = this.tail = node;
      return;
    }

    this.tail.next = node;
    this.tail = node;
  }

  deque(): T | undefined {
    if (!this.head) {
      return undefined;
    }

    this.length--;

    const head = this.head;
    this.head = this.head.next;

    // free
    head.next = undefined;

    if (this.length === 0) {
      this.tail = undefined;
    }

    return head.value;
  }

  peek(): T | undefined {
    if (!this.head) {
      return undefined;
    }
    return this.head?.value;
  }
}
