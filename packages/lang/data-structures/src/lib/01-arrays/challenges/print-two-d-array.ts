export function printRowFirst(arr: number[][]): void {
  for (let i = 0; i < arr.length; ++i) {
    for (let j = 0; j < arr[i].length; j++) {
      console.log(arr[i][j]);
    }
  }
}

export function printColFirst(arr: number[][]): void {
  for (let i = 0; i < arr.length; ++i) {
    for (let j = 0; j < arr[i].length; j++) {
      console.log(arr[j][i]);
    }
  }
}
