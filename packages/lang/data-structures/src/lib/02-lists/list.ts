export interface List<T> {
  /** O(1) constant time */
  length: number;
  /**
   * O(1) constant time
   * Unless we need to grow the capacity
   * then create a new array double the size
   * and copy all elements into the new array
   */
  append(item: T): void;
  get(idx: number): T | undefined;
  /** WARN: Throws 'ERROR: Index out of bounds'; */
  insertAt(item: T, idx: number): void;
  prepend(item: T): void;
  /** Remove the item and fill in the space */
  remove(item: T): T | undefined;
  /**
   * Remove the item and fill in the space
   * O(N) linear time
   */
  removeAt(idx: number): T | undefined;
}
