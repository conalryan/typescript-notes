import { BinaryNode } from '../binary-tree';
import { binaryTreeContains } from './binary-tree-contains';

describe('given the function binaryTreeContains', () => {
  let root: BinaryNode<number>;
  beforeEach(() => {
    root = {
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
        left: {
          value: 5,
          left: {
            value: 9,
            left: null,
            right: null,
          },
          right: null,
        },
        right: null,
      }
    };
  });

  describe('and a binary tree with a searchabe value', () => {
    describe('and a searchable number (9)', () => {
      let result: boolean;
      beforeEach(() => {
        result = binaryTreeContains(root, 9);
      });
      it('should return true', () => {
        expect(result).toEqual(true);
      });
    });

    describe('and a non-searchable number (88)', () => {
      let result: boolean;
      beforeEach(() => {
        result = binaryTreeContains(root, 88);
      });
      it('should return false', () => {
        expect(result).toEqual(false);
      });
    })
  });
});
