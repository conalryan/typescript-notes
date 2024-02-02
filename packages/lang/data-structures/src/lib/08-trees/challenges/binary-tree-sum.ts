import { BinaryNode } from '../binary-tree';

export const binarySum = (node: BinaryNode<number> | null): number => {
  // Base case
  // end of tree/branch
  if (node === null) {
    return 0;
  }

  // Recurse
  return node.value + binarySum(node.left) + binarySum(node.right)
};
