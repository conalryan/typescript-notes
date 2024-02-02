import { BinaryNode } from "../binary-tree";

export const binaryTreeContains = (node: BinaryNode<number> | null, search: number): boolean => {
  // Base case
   // End of tree/branch
   if (node === null) {
    return false;
  }
  // Found item
  if (node.value === search) {
    return true;
  }

  // Recurse
  return binaryTreeContains(node.left, search) || binaryTreeContains(node.right, search);
};
