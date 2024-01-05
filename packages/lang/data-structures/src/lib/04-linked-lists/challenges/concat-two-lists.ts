import { SingleLinkedNode } from "../linked-list";

/**
 * Modify l1 so the end of l1 points to the root of l2
 */
export function concat(l1: SingleLinkedNode<number>, l2: SingleLinkedNode<number>): SingleLinkedNode<number> {
  let curr = l1;
  while (curr.next) {
    curr = curr.next;
  }

  curr.next = l2;

  return l1;
}
