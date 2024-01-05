/**
 * Return the max number in the array
 */
export function max(arr: number[]): number {
  let max = arr[0];

  for (let i = 1; i < arr.length; i++) {
    max = Math.max(max, arr[i]);
  }

  return max;
}
