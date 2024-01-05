import { SingleLinkedNode } from "../linked-list";

/**
 * Assume l1 and l2 are sorted ascending.
 * Merge all the nodes of l2 into l1 and keep all nodes sorted.
 */
export function merge(l1: SingleLinkedNode<number>, l2: SingleLinkedNode<number>): SingleLinkedNode<number> | undefined {
  let curr1 = l1;
  let curr2 = l2;
  let merged: SingleLinkedNode<number> | undefined;
  let curr: SingleLinkedNode<number>;

  while (curr1 || curr2) {
    if (curr1?.value && !curr2.value) {
      if (!merged) {
        merged = { value: curr1.value }
        curr = merged
      } else {
        curr!.next = { value: curr1.value } as SingleLinkedNode<number>;
        curr = curr!.next;
      }
      curr1 = curr1.next as SingleLinkedNode<number>;
    } else if (!curr1?.value && curr2.value) {
      if (!merged) {
        merged = { value: curr2.value }
        curr = merged
      } else {
        curr!.next = { value: curr2.value }
        curr = curr!.next;
      }
      curr2 = curr2.next as SingleLinkedNode<number>;
    } else if (curr1?.value < curr2?.value) {
      if (!merged) {
        merged = { value: curr1.value }
        curr = merged
      } else {
        curr!.next = { value: curr1.value }
        curr = curr!.next;
      }
      curr1 = curr1.next as SingleLinkedNode<number>;
    } else if (curr2?.value < curr1?.value) {
      if (!merged) {
        merged = { value: curr2.value }
        curr = merged
      } else {
        curr!.next = { value: curr2.value }
        curr = curr!.next;
      }
      curr2 = curr2.next as SingleLinkedNode<number>;
    }
  }

  return merged;
}
