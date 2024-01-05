import { SingleLinkedNode } from "../linked-list";

/**
 * Write a function that accepts a LinkedList
 * and returns true if the list is sorted in ascending order.
 * Bonus: return true if it's either ascending or descending.
 */
export function isSorted(node: SingleLinkedNode<number>): boolean {
  let isAsc = true;
  let isDesc = true;

  if (!node || !node.next) {
    return true;
  }

  let curr = node;
  while (curr.next) {
    if (curr.value > curr.next.value) {
      isAsc = false;
    } else if (curr?.value < curr.next?.value) {
      isDesc = false;
    }
    curr = curr.next;
  }

  return isAsc || isDesc;
}
