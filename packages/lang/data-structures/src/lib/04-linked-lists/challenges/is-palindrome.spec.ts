import { SingleLinkedNode } from "../linked-list";
import { isPalindrome } from './is-palindrome';

describe('given the isPalindrom function', () => {
  describe('and a three letter pallindrome', () => {
    let result: boolean;
    beforeEach(() => {
      const node: SingleLinkedNode<string> = { value: 'a' };
      const n2: SingleLinkedNode<string> = { value: 'b' };
      const n3: SingleLinkedNode<string> = { value: 'a' };

      node.next = n2;
      n2.next = n3;

      result = isPalindrome(node);
    });
    it('should return true', () => {
      expect(result).toEqual(true);
    });
  });

  describe('and a four letter pallindrome', () => {
    let result: boolean;
    beforeEach(() => {
      const node: SingleLinkedNode<string> = { value: 'a' };
      const n2: SingleLinkedNode<string> = { value: 'b' };
      const n3: SingleLinkedNode<string> = { value: 'b' };
      const n4: SingleLinkedNode<string> = { value: 'a' };

      node.next = n2;
      n2.next = n3;
      n3.next = n4;

      result = isPalindrome(node);
    });
    it('should return true', () => {
      expect(result).toEqual(true);
    });
  });

  describe('and not a pallindrome', () => {
    let result: boolean;
    beforeEach(() => {
      const node: SingleLinkedNode<string> = { value: 'a' };
      const n2: SingleLinkedNode<string> = { value: 'b' };
      const n3: SingleLinkedNode<string> = { value: 'c' };
      const n4: SingleLinkedNode<string> = { value: 'a' };

      node.next = n2;
      n2.next = n3;
      n3.next = n4;

      result = isPalindrome(node);
    });
    it('should return false', () => {
      expect(result).toEqual(false);
    });
  });
});
