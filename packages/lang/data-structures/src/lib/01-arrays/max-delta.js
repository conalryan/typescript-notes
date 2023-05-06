function maxDeltaZero(array) {
  let maxDelta = Math.abs(array[0] - array[1]);

  // need to compare two elements in array, therefore pass index in forEach
  array.forEach((element, idx) => {
    const curr = element;
    const next = array[idx + 1];
    const delta = Math.abs(curr - next);

    if (delta > maxDelta) {
      maxDelta = delta;
    }
  });

  return maxDelta;
}

/**
 * Using 1 index and comparing index to - 1
 */
function maxDeltaOne(array) {
  let maxDelta = Math.abs(array[0] - array[1]);

  // Must use for loop to start at an index other than 0
  for (let i = 1; i < array.length; i++) {
    const prev = array[i - 1];
    const curr = array[i];
    const delta = Math.abs(prev - curr);

    if (delta > maxDelta) {
      maxDelta = delta;
    }
  }

  return maxDelta;
}

const ww = [70, 72, 68, 65, 74, 74, 73];
console.log(maxDeltaZero(ww));

console.log(maxDeltaOne(ww));
