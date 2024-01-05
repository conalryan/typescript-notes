/**
 * Determine if the given array contains the given value
 *
 * return true if the given array
 * contains the given value
 * contains([14, 55, 67, 88], 67) -> true
 * contains([14, 55, 67, 88], 66) -> false
 */
export function contains(arr: number[], value: number): boolean {
  for (let i = 0; i < arr.length; i++) {
      if (arr[i] === value) {
          return true
      }
  }
  return false
}
