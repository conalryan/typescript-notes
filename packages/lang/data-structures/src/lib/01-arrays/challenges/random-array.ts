/**
 * Returns an array of the given size
 * filled with random numbers less than the given max
 */
export function randomArray(max: number, size: number): number[] {
  const result = new Array(size);

  for (let i = 0; i < size; i++) {
    const random = Math.floor(Math.random() * max);
    result[i] = random;
  }

  return result;
}
