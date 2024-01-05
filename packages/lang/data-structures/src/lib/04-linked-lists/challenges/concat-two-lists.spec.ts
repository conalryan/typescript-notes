import { SingleLinkedNode } from "../linked-list";
import { concat } from './concat-two-lists';

describe('given the concatTwoLists function', () => {
  describe('and two lists', () => {
    let result: SingleLinkedNode<number>;
    beforeEach(() => {
      const n1 =  { value: 1 } as SingleLinkedNode<number>;
      const n2 =  { value: 2 } as SingleLinkedNode<number>;
      const n3 =  { value: 3 } as SingleLinkedNode<number>;

      n1.next = n2
      n2.next = n3

      const n4 =  { value: 4 } as SingleLinkedNode<number>;
      const n5 =  { value: 5 } as SingleLinkedNode<number>;
      const n6 =  { value: 6 } as SingleLinkedNode<number>;

      n4.next = n5
      n5.next = n6
      result = concat(n1, n4);
    });
    it('should concat the lists', () => {
      expect(result.value).toEqual(1);
    });
    it('should concat the lists', () => {
      expect(result.next?.next?.next?.value).toEqual(4);
    });
  });
});
