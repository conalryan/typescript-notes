import { LinkedList, SingleLinkedNode } from "./linked-list";

export class SingleLinkedList<T> implements LinkedList<T> {
  private length: number;
  private head?: SingleLinkedNode<T>;
  private tail?: SingleLinkedNode<T>;

  constructor() {
    this.length = 0;
    this.head = this.tail = undefined;
  }

  append(item: T): void {
    const node = { value: item } as SingleLinkedNode<T>;

    this.length++;

    if (!this.head) {
      this.head = this.tail = node;
      return;
    }

    (this.tail as SingleLinkedNode<T>).next = node;
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

  prepend(item: T): void {
    const node = { value: item } as SingleLinkedNode<T>;

    this.length++;

    if (!this.head) {
      this.head = this.tail = node;
      return;
    }

    if (this.head === this.tail) {
      node.next = this.head;
      this.head = node;
      this.tail = node.next;
    } else {
      node.next = this.head;
      this.head = node;
    }
  }

  remove(item: T): T | undefined {
    if (!this.head) {
      return;
    }

    if (this.head?.value === item) {
      this.length--;
      const node = this.head;
      this.head = this.head.next;
      node.next = undefined;
      return node.value;
    }

    if (this.head === this.tail) {
      this.tail = this.head;
    }

    let curr = this.head;
    while(curr.next) {
      if (curr.next.value === item) {
        this.length--;
        const node = curr.next;
        curr.next = curr.next.next;
        node.next = undefined;
        if (this.tail === node) {
          this.tail = curr;
        }
        return node.value;
      }
      curr = curr.next as SingleLinkedNode<T>;
    }

    return undefined;
  }
}
