/**
 * accepts an array and returns the total of the
 * differences of each value in the array.
 * given: [2, 6, 12, 19]
 * returns (4 + 6 + 7) -> 17
 */
export function sumDelta(arr: number[]): number {
    let total = 0;
    for (let i = 0; i < arr.length - 1; i++) {
        const v1 = arr[i];
        const v2 = arr[i + 1];
        const delta = Math.abs(v1 - v2);
        total += delta;
    }
    return total;
}
