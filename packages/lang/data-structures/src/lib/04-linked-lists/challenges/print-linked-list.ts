import { SingleLinkedNode } from "../linked-list";

export function printList<T>(node: SingleLinkedNode<T>): void {
  let current = node
  while (current != null) {
      console.log(current.value)
      current = current.next as SingleLinkedNode<T>;
  }
}

const n1 =  { value: 1 } as SingleLinkedNode<number>;
const n2 =  { value: 2 } as SingleLinkedNode<number>;
const n3 =  { value: 3 } as SingleLinkedNode<number>;

n1.next = n2
n2.next = n3

printList(n1)

// [LOG]: 1
// [LOG]: 2
// [LOG]: 3
