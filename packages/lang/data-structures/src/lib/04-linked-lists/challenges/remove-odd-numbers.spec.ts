import { SingleLinkedNode } from '../linked-list';
import { removeOddNumbers } from './remove-odd-numbers';

describe('given the removeOddNumbers function', () => {
  describe('and one node', () => {
    let node: SingleLinkedNode<number>;
    beforeEach(() => {
      node = { value: 1 };
      node = removeOddNumbers(node);
    });
    it('should remove the odd node', () => {
      expect(node).toBeUndefined();
    });
  });

  describe('and two nodes with an odd head', () => {
    let node: SingleLinkedNode<number>;
    beforeEach(() => {
      node = { value: 1 };
      const n2 = { value: 2 };
      node.next = n2;
      node = removeOddNumbers(node);
    });
    it('should remove the odd node', () => {
      expect(node?.value).toEqual(2);
    });
  });

  describe('and two nodes with an odd tail', () => {
    let node: SingleLinkedNode<number>;
    beforeEach(() => {
      node = { value: 2 };
      const n2 = { value: 1 };
      node.next = n2;
      node = removeOddNumbers(node);
    });
    it('should remove the odd node', () => {
      expect(node?.value).toEqual(2);
    });
  });

  describe('and four nodes', () => {
    let node: SingleLinkedNode<number>;
    beforeEach(() => {
      node = { value: 2 };

      const n2: SingleLinkedNode<number> = { value: 1 };
      node.next = n2;

      const n3: SingleLinkedNode<number> = { value: 4 };
      n2.next = n3;

      const n4: SingleLinkedNode<number> = { value: 5 };
      n3.next = n4;

      node = removeOddNumbers(node);
    });
    it('should remove the odd node', () => {
      expect(node?.next?.value).toEqual(4);
    });
  });
});
