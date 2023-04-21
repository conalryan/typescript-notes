/** StackOverflow https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers */
export const scale = (num: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
  // return (num - inMin) * (outMax - outMin) / (inMax - inMin) + outMin; WORKS
  const normalizeIn = num - inMin;
  const outRange = outMax - outMin;
  const normalizeProduct = normalizeIn * outRange;
  const inRange = inMax - inMin;
  return normalizeProduct / inRange + outMin;
};
