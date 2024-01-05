import { SingleLinkedNode } from "../linked-list";

/**
 * Accept a linked list where each node has one letter in it's data property.
 * Return whether or not the string the whole list represents is a palindrome.
 */
export function isPalindrome(node: SingleLinkedNode<string>): boolean {
  if (!node || !node.value) {
    return false;
  }

  let str = '';
  let curr = node;
  while (curr) {
    str += curr.value;
    curr = curr.next as SingleLinkedNode<string>;
  }

  let result = true;
  const mid = Math.floor(str.length / 2);
  for (let i = 0; i < mid; i++) {
    if (str.charAt(i) !== str.charAt(str.length - 1 - i)) {
      result = false;
    }
  }

  return result;
}
