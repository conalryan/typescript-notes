/**
 * Determine if the given array is sorted ascending or descending
 *
 * return true if the array is sorted either
 * ascending, or descending.
 * [] => true
 * [42] => true
 * [39, 42] => true
 * [42, 39] => true
 * [1, 2, 3, 4, 5] => true
 * [5, 4, 3, 2, 1] => true
 * [1, 5, 2] => false
 */
export function isSorted(arr: number[]): boolean {
  let isAsc = true;
  let isDsc = true;

  // test asc
  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] > arr[i]) {
      isAsc = false;
    } else if (arr[i - 1] < arr[i]) {
      isDsc = false
    }
  }

  return isAsc || isDsc;
}
