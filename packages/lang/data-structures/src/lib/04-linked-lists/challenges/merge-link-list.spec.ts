import { SingleLinkedNode } from '../linked-list';
import { merge } from './merge-linked-lists';

describe('given the merge function', () => {
  describe('and two lists', () => {
    let result: SingleLinkedNode<number> | undefined;
    beforeEach(() => {
      const n1 =  { value: 3 } as SingleLinkedNode<number>;
      const n2 =  { value: 5 } as SingleLinkedNode<number>;
      const n3 =  { value: 7 } as SingleLinkedNode<number>;

      n1.next = n2
      n2.next = n3

      const n4 =  { value: 2 } as SingleLinkedNode<number>;
      const n5 =  { value: 4 } as SingleLinkedNode<number>;
      const n6 =  { value: 10 } as SingleLinkedNode<number>;
      const n7 =  { value: 11 } as SingleLinkedNode<number>;

      n4.next = n5
      n5.next = n6
      n6.next = n7;

      result = merge(n1, n4);
    });
    it('should merge the lists', () => {
      expect(result?.value).toEqual(2);
    });
    it('should merge the lists', () => {
      expect(result?.next?.value).toEqual(3);
    });
    it('should merge the lists', () => {
      expect(result?.next?.next?.value).toEqual(4);
    });
    it('should merge the lists', () => {
      expect(result?.next?.next?.next?.next?.next?.value).toEqual(10);
    });
  });
});
