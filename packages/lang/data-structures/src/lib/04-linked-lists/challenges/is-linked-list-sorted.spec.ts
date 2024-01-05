import { isSorted } from "./is-linked-list-sorted";
import { SingleLinkedNode } from "../linked-list";

describe('given the isSorted function', () => {
  describe('and an empty list', () => {
    let result: boolean;
    beforeEach(() => {
      result = isSorted({} as SingleLinkedNode<number>);
    });
    it('should return true', () => {
      expect(result).toEqual(true);
    });
  });

  describe('and a single item', () => {
    let result: boolean;
    beforeEach(() => {
      const n1 =  { value: 1 } as SingleLinkedNode<number>;
      result = isSorted(n1);
    });
    it('should return true', () => {
      expect(result).toEqual(true);
    });
  });

  describe('and a linked list in ascending order', () => {
    let result: boolean;
    beforeEach(() => {
      const n1 =  { value: 1 } as SingleLinkedNode<number>;
      const n2 =  { value: 2 } as SingleLinkedNode<number>;
      const n3 =  { value: 3 } as SingleLinkedNode<number>;

      n1.next = n2
      n2.next = n3

      result = isSorted(n1);
    });
    it('should return true', () => {
      expect(result).toEqual(true);
    });
  });

  describe('and a linked list in descending order', () => {
    let result: boolean;
    beforeEach(() => {
      const n1 =  { value: 3 } as SingleLinkedNode<number>;
      const n2 =  { value: 2 } as SingleLinkedNode<number>;
      const n3 =  { value: 1 } as SingleLinkedNode<number>;

      n1.next = n2
      n2.next = n3

      result = isSorted(n1);
    });
    it('should return true', () => {
      expect(result).toEqual(true);
    });
  });

  describe('and a linked list not in order', () => {
    let result: boolean;
    beforeEach(() => {
      const n1 =  { value: 32 } as SingleLinkedNode<number>;
      const n2 =  { value: 2 } as SingleLinkedNode<number>;
      const n3 =  { value: 45 } as SingleLinkedNode<number>;

      n1.next = n2
      n2.next = n3

      result = isSorted(n1);
    });
    it('should return false', () => {
      expect(result).toEqual(false);
    });
  });
});
