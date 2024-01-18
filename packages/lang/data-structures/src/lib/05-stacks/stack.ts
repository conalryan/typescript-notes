export type StackNode<T> = {
  value: T,
  prev?: StackNode<T>,
}

export interface IStack<T> {
  push(item: T): void;
  pop(): T | undefined;
  peek(): T | undefined;
}

export class Stack<T> implements IStack<T> {
  public length: number;
  private head?: StackNode<T>;

  constructor() {
    this.length = 0;
    this.head = undefined;
  }

  push(item: T): void {
    const node = { value: item } as StackNode<T>;

    this.length++;
    if (!this.head) {
      this.head = node;
      return;
    }

    node.prev = this.head;
    this.head = node;
  }

  pop(): T | undefined {
    if (!this.head) {
      return undefined;
    }

    this.length--;

    const head = this.head;
    this.head = this.head.prev;

    // free
    head.prev = undefined;

    return head.value;
  }

  peek(): T | undefined {
    return this.head?.value;
  }
}
