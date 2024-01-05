import { SingleLinkedNode } from "../linked-list";

export function sumList(node: SingleLinkedNode<number>): number {
  let current = node
  let sum = 0;
  while (current != null) {
    sum += current.value;
    current = current.next as SingleLinkedNode<number>;
  }
  return sum;
}
