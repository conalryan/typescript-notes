import { SingleLinkedNode } from "../linked-list";

/**
 * https://www.geeksforgeeks.org/reverse-a-linked-list/
 * Reverse a Linked List:
 * Given a pointer to the head node of a linked list, the task is to reverse the linked list.
 * We need to reverse the list by changing the links between nodes.
 *
 * Examples:
 * Input: Head of following linked list
 * 1->2->3->4->NULL
 * Output: Linked list should be changed to,
 * 4->3->2->1->NULL
 *
 * Input: Head of following linked list
 * 1->2->3->4->5->NULL
 * Output: Linked list should be changed to,
 * 5->4->3->2->1->NULL
 *
 * Input: NULL
 * Output: NULL
 *
 * Input: 1->NULL
 * Output: 1->NULL
 *
 * Solution:
 * Reverse a linked list by Iterative Method:
 * The idea is to use three pointers curr, prev, and next to keep track of nodes to update reverse links.
 *
 * Follow the steps below to solve the problem:
 * - Initialize three pointers prev as NULL, curr as head, and next as NULL.
 * - Iterate through the linked list. In a loop, do the following:
 *    1. store the next node
 *    2. update the curr.next to prev
 *    3. update prev to curr
 *    4. update curr to next
 *
 * Time Complexity: O(N), Traversing over the linked list of size N.
 * Auxiliary Space: O(1)
 *
 * 1. Store curr.next
 * 2. curr.next = prev
 */
export function reverseSingleLinkedList(head: SingleLinkedNode<number>): SingleLinkedNode<number> | undefined {
  let prev: SingleLinkedNode<number> | undefined = undefined; // 3. update prev as curr
  let curr: SingleLinkedNode<number>| undefined = head; // 4. update curr as next
  let next: SingleLinkedNode<number> | undefined = undefined; // 1. store the next node

  // 1. NCN
  // 2. CNP
  // 3. PC
  // 4. CN
  while (curr) { //                 (1st) head = { value: 1, next: 2 };         (2nd) curr = { value 2, next: 3 };                (3rd) curr = { value: 3, next: undefined }; (4th) curr = undefined;
    // 1. store curr.next
    next = curr.next; //            (1st) next = { value: 2, next: 3 };         (2nd) next = { value 3: next: undefined };        (3rd) next = undefined;
    // 2. update curr.next to prev
    curr.next = prev; //            (1st) undefined;                            (2nd) curr.next = { value: 1, next: undefined };  (3rd) curr.next = { value: 2, next: 1 };
    // 3. update prev to curr
    prev = curr; //                 (1st) prev = { value: 1, next: undefind };  (2nd) prev = { value: 2, next: 1 };               (3rd) prev = { value: 3, next: 2 };
    // 4. update curr to next
    curr = next; //                 (1st) curr = { value 2, next 3 };           (2nd) curr = { value 3: undefined };              (3rd) curr = undefined;
  }

  return prev;
}
