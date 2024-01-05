/**
 * Returns the max delta between any two adjacent number in an arr.
 *
 * [70, 72, 68, 65, 74, 74, 73]
 * Deltas: 2, 4, 3, 9, 0, 1
 * Return 9
 *
 * Uses current index compared to next index so must just length - 1 to avoid out of bounds error.
 */
export function maxDeltaZeroIndex(arr: number[]): number {
  let maxDelta = Math.abs(arr[0] - arr[1]);

  // already compared 0 - 1 index in maxDelta initialization, so we can skip it.
  for (let i = 1; i < arr.length - 1; i++) {
    const curr = arr[i];
    const next = arr[i + 1];
    const delta = Math.abs(curr - next);

    if (delta > maxDelta) {
      maxDelta = delta;
    }
  }

  return maxDelta;
}

/**
 * Returns the max delta between any two adjacent number in an arr.
 *
 * [70, 72, 68, 65, 74, 74, 73]
 * Deltas: 2, 4, 3, 9, 0, 1
 * Return 9
 *
 * Using 1 index and compares current to previous.
 */
export function maxDeltaOneIndex(arr: number[]): number {
  let maxDelta = Math.abs(arr[0] - arr[1]);

  // already compared 1 - 0 index in maxDelta initialization, so we can skip it.
  for (let i = 2; i < arr.length; i++) {
    const prev = arr[i - 1];
    const curr = arr[i];
    const delta = Math.abs(prev - curr);

    if (delta > maxDelta) {
      maxDelta = delta;
    }
  }

  return maxDelta;
}
