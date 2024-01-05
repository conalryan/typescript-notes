import { SingleLinkedNode } from "../linked-list";

/**
 * Accept a linked list and remove and nodes
 * with odd-numbered data values
 */
export function removeOddNumbers(node: SingleLinkedNode<number>): SingleLinkedNode<number> {
  let head = node;

  let curr = head;
  while (curr && curr.next) {
    if (curr.next.value % 2 !== 0) {
      const next = curr.next as SingleLinkedNode<number>;
      curr.next = next.next;
      next.next = undefined;
    }

    curr = curr.next as SingleLinkedNode<number> || curr;
  }

  if (head.value % 2 !== 0) {
    const next = node.next as SingleLinkedNode<number>;
    head = next;
    if (next) {
      next.next = undefined;
    }
  }

  return head;
}
