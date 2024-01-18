import { SingleLinkedNode } from "../linked-list";

/**
 * Reverse a linked list by Iterative Method:
 * https://www.geeksforgeeks.org/reverse-a-linked-list/
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
 *    2. swap the curr.next to prev
 *    3. update prev to curr
 *    4. update curr to next
 *
 * Time Complexity: O(N), Traversing over the linked list of size N.
 * Auxiliary Space: O(1)
 *
 * reverse a linked list
 * 1. iterative method
 *
 * 1.1. cache next
 * next = curr.next;
 *
 * 1.2. swap current node next to prev
 * curr.next = prev;
 *
 * 1.3. move prev
 * prev = curr;
 *
 * 1.4. move curr
 * curr = next;
 *
 */
export function reverseSingleLinkedListIterative(head: SingleLinkedNode<number>): SingleLinkedNode<number> | undefined {
  let prev: SingleLinkedNode<number> | undefined = undefined; // 3. update prev as curr
  let curr: SingleLinkedNode<number>| undefined = head; // 4. update curr as next
  let next: SingleLinkedNode<number> | undefined = undefined; // 1. store the next node

  // 1. Cache curr.next
  // 2. Reverse curr.next and prev
  // 3. Backtrack prev to curr
  // 4. curr is next
  while (curr) { //                 (1st) head = { value: 1, next: 2 };         (2nd) curr = { value 2, next: 3 };                (3rd) curr = { value: 3, next: undefined }; (4th) curr = undefined;
    // 1. store curr.next
    next = curr.next; //            (1st) next = { value: 2, next: 3 };         (2nd) next = { value 3: next: undefined };        (3rd) next = undefined;
    // 2. update curr.next to prev
    curr.next = prev; //            (1st) curr.next = undefined;                            (2nd) curr.next = { value: 1, next: undefined };  (3rd) curr.next = { value: 2, next: 1 };
    // 3. update prev to curr
    prev = curr; //                 (1st) prev = { value: 1, next: undefind };  (2nd) prev = { value: 2, next: 1 };               (3rd) prev = { value: 3, next: 2 };
    // 4. update curr to next
    curr = next; //                 (1st) curr = { value 2, next 3 };           (2nd) curr = { value 3: undefined };              (3rd) curr = undefined;
  }

  return prev;
}

/**
 * Reverse a linked list using Recursion:
 * https://www.geeksforgeeks.org/reverse-a-linked-list/
 * The idea is to reach the last node of the linked list using recursion then start reversing the linked list.
 *
 * Solution
 * Follow the steps below to solve the problem:
 * - Divide the list in two parts – first node and rest of the linked list.
 * - Call reverse for the rest of the linked list.
 * - Link the rest linked list to first.
 * - Fix head pointer to NULL
 *
 * Time Complexity: O(N), Visiting over every node one time
 * Auxiliary Space: O(N), Function call stack space
 *
 * 1. Divide the list into two parts
 *    1. First
 *    2. Rest
 * 2. Reverse the Rest
 *    1. Rest.prev = First
 * 3. Link Rest to First
 *    1. First.next.next = First
 *    2. First.next = null
 * 4. Change Head
 *    1. head = rest
 *
 */
export function revertSingleLinkedListRecursive(head: SingleLinkedNode<number>): SingleLinkedNode<number> | undefined {
  // Base case
  if (head == null || head.next == null) {  // (1st) head = { value: 1, next: 2 }: (2nd) head = { value: 2, next: 3 }; (3rd) head = { value: 3, next: undefined };
    return head;// (3rd) head = { value: 3, next: undefined };
  }

  // Recurse
  // 1. Divide the list into two parts
  // reverse the rest list and put the first element at the end
  const rest = revertSingleLinkedListRecursive(head.next); // (1st) head = { value: 1, next: 2 }: (2nd) head = { value: 2, next: 3 };
  head.next.next = head; // (3rd) head.next.next = { value: 2, next: 3 }; (4th) head.next.nect = { value: 1, next: 2 };

  /* tricky step -- see the diagram */
  head.next = undefined; // (3rd) head.next = undefined; (4th) headn.next = undefined

  /* fix the head pointer */
  return rest; // (3rd) rest = { value 3, next: 2 }; (4th) rest = { value: 3, next: 2 };
}
