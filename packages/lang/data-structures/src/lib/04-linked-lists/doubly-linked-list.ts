import { DoubleLinkedNode, LinkedList } from "./linked-list";

export class DoublyLinkedList<T> implements LinkedList<T> {
  public length: number;
  private head?: DoubleLinkedNode<T>;
  private tail?: DoubleLinkedNode<T>;

  constructor() {
    this.length = 0;
    this.head = this.tail = undefined;
  }

  append(item: T): void {
    this.length++;
    const node = { value: item } as DoubleLinkedNode<T>;

    if (!this.tail) {
      this.head = this.tail = node;
      return;
    }

    node.prev = this.tail;
    this.tail.next = node;
    this.tail = node;
  }

  get(item: T): T | undefined {
    let curr = this.head;

    while (curr) {
      if (curr.value === item) {
        return curr.value;
      }
      curr = curr.next;
    }

    return undefined;
  }

  insertAt(item: T, idx: number): void {
    if (idx > this.length) {
      throw new Error('Index out of bounds');
    } else if (idx === 0) {
      this.prepend(item);
      return;
    } else if (idx === this.length) {
      this.append(item);
      return;
    }

    this.length++;

    const curr = this.getAt(idx) as DoubleLinkedNode<T>;
    const node = { value: item } as DoubleLinkedNode<T>;
    node.next = curr;
    node.prev = curr.prev;
    curr.prev = node;

    if (node.prev) {
      node.prev.next = node;
    }

    if (curr === this.head) {
      this.head = curr.next;
    }

    if (curr === this.tail) {
      this.tail = curr.prev;
    }
  }

  prepend(item: T): void {
    const node = { value: item } as DoubleLinkedNode<T>;

    this.length++;
    if (!this.head) {
      this.head = this.tail = node;
      return;
    }

    node.next = this.head;
    this.head.prev = node;
    this.head = node;
  }

  remove(item: T): T | undefined {
    let curr = this.head;
    for (let i = 0; curr && curr.value && i < this.length; ++i) {
      if (curr.value === item) {
        break;
      }
      curr = curr.next;
    }

    if (!curr) {
      return undefined;
      ``
    }

    return this.removeNode(curr);
  }

  removeAt(idx: number): T | undefined {
    const node = this.getAt(idx);

    if (!node) {
      return undefined;
    }

    return this.removeNode(node);
  }

  private getAt(idx: number): DoubleLinkedNode<T> | undefined {
    let curr = this.head;
    for (let i = 0; curr && i < idx; ++i) {
      curr = curr.next;
    }
    return curr;
  }

  private removeNode(node: DoubleLinkedNode<T>): T | undefined {
    this.length--;

    if (this.length === 0) {
      const value = this.head?.value;
      this.head = this.tail = undefined;
      return value;
    }

    if (node.prev) {
      node.prev.next = node.next;
    } else if (this.head === node) {
      // Check is redundant if there is no prev then it should be the head.
      this.head = node.next;
    }

    if (node.next) {
      node.next.prev = node.prev;
    } else if (this.tail === node) {
      // Check is redundant if there is no next then it should be the tail.
      this.tail = node.prev;
    }

    // free
    node.next = node.prev = undefined;

    return node.value;
  }
}
