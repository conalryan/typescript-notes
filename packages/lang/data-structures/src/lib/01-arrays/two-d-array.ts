/** https://www.typescriptlang.org/play?ts=5.3.2#code/MYewdgzgLgBAhgJwQLhmArgWwEYFMEDaAusTALwzEDcAUIoQAxHmUCMANDAEycDMRtegVbMKBXpwAsnAKwC6SAl1GUAbJwDsnABzyaoSCAA2uAHRGQAcwAU9AJRUYAeieUAMgHkA4kVQFhnDww-JziUrJEoeowWjC6RPrgEMZmFjZCTEpEDs6uBJ4+qLyJhibmVraKIsLZji7u3r4wkiXJZWmVhMoETDn1+Y2oqkA */
const arr: number[][] = [];
arr[0] = [1, 2, 3];
arr[1] = [4, 5, 6];
arr[2] = [7, 8, 9];

console.log(arr); // [LOG]: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
console.log(arr[0][2]); // [LOG]: 3
console.log(arr[1][1]); // [LOG]: 5
console.log(arr[2][0]); // [LOG]: 7
