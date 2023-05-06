/**
 * Insertion sort aka swap sort: O(n^2 Quadractic)
 * Loop from 0 until the end
 * Shifting elements to the right until they are sorted
 * ```
    sort (A)
      for pos = 1 to n - 1 do
        insert (A, pos, A[pos])
      end

      insert (A, pos, rightValue)
        i = pos - 1 // zero index
        while i >= 0 and A[i] > rightValue do
          // Shifts elements greater than value to the right i.e. swap.
          A[i + 1] = A[i]
          i = i - 1 // reset index
        A[i + 1] = rightValue // insert value into proper location
      end
    ```
 */
let count = 0;
export const insertionSort = (items: any[]) => {
  for (let i = 1; i < items.length; i++) {
    insert(items, i, items[i]);
  }
  console.log('count', count);
};

const insert = (items: any[], position: number, value: any) => {
  let i = position - 1;
  while (i >= 0 && items[i] > value) {
    console.log('swapping, ', items[i + 1], items[i])
    items[i + 1] = items[i]; // swap
    items[i] = value;
    i = i - 1; // backtrack
    count++
  }
};
