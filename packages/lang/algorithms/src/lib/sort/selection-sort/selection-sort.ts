const maxIndex = (items: any[], start: number, end: number) => {
  let i: number = start;
  let maxPos: number = start;
  while (++i <= end) {
    if (items[i] > items[maxPos]) {
      maxPos = i;
    }
  }
  return maxPos;
}

/**
 * Selection sort O(n^2 Quadractic)
 * Loop from 0 until the end
 * Find the largest element and shift to end
 * Loop remaining range
 */
let count = 0;
export const selectionSort = (items: any[]) => {
  // repeatedly select max in items[0,i] and swap with proper position
  for (let i = items.length - 1; i >= 0; i--) {
    const maxIdx = maxIndex(items, 0, i);
    if (maxIdx != i) {
      console.log('swapping ', items[i], items[maxIdx]);
      const tmp = items[i];
      items[i] = items[maxIdx];
      items[maxIdx] = tmp;
      count++
    }
  }
  console.log('count', count);
};
