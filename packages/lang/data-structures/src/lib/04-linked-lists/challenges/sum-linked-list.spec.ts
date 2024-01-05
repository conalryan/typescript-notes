import { SingleLinkedNode } from "../linked-list";
import { sumList } from './sum-linked-list';

describe('given the sumList function', () => {
  describe('and a linked list', () => {
    let result: number;
    beforeEach(() => {
      const n1 =  { value: 1 } as SingleLinkedNode<number>;
      const n2 =  { value: 2 } as SingleLinkedNode<number>;
      const n3 =  { value: 3 } as SingleLinkedNode<number>;

      n1.next = n2
      n2.next = n3

      result = sumList(n1);
    });
    it('should return the correct value', () => {
      expect(result).toEqual(6);
    });
  });
})
