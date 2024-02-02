import { BinaryNode } from '../binary-tree';
import { binarySum } from './binary-tree-sum';

describe('given the function sum', () => {
  describe('and the number ', () => {
    let result: number;
    beforeEach(() => {
      const root: BinaryNode<number> = {
        value: 1,
        left: {
          value: 2,
          left: {
            value: 3,
            left: null,
            right: null,
          },
          right: null,
        },
        right: {
          value: 4,
          left: null,
          right: null,
        }
      };
      result = binarySum(root);
    });
    it('should return correct result', () => {
      expect(result).toEqual(10);
    });
  });
});
