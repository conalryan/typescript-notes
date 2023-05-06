export function max(array) {
  // find the max number in the array
  let max = array[0];

  for (let i = 0; i < array.length; i++) {
    max = Math.max(max, array[i]);
  }

  return max;
}
