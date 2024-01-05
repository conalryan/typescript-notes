export function largestProduct(arr: number[][]): number {
    let largest = arr[0][0] * arr[0][1];
    let row1 = 0;
    let col1 = 0;
    let row2 = 0;
    let col2 = 0;

    // returns the value of the element in a 2d array
    // for the given row and column. Or, returns a default
    // value if the row or column is out of bounds (returns zero).
    function getCell(arr: number[][], rowIdx: number, colIdx: number): number {
        if (rowIdx < 0 || colIdx < 0) {
            return 0
        }
        if (rowIdx >= arr.length) {
            return 0
        }
        if (colIdx >= arr[rowIdx].length) {
            return 0
        }
        return arr[rowIdx][colIdx]
    }

    function updateLargest(r1: number, c1: number, r2: number, c2: number): void {
        const value = getCell(arr, r1, c1);
        const other = getCell(arr, r2, c2);
        if (value * other > largest) {
            largest = value * other;
            row1 = r1;
            col1 = c1;
            row2 = r2;
            col2 = c2;
        }
    }

    for (let rowIdx = 0; rowIdx < arr.length; rowIdx++) {
        for (let colIdx = 0; colIdx < arr[rowIdx].length; colIdx++) {
            updateLargest(rowIdx, colIdx, rowIdx, colIdx - 1) // left
            updateLargest(rowIdx, colIdx, rowIdx, colIdx + 1) // right
            updateLargest(rowIdx, colIdx, rowIdx - 1, colIdx) // top
            updateLargest(rowIdx, colIdx, rowIdx + 1, colIdx) // bottom
        }
    }
    console.log(arr[row1][col1], '*', arr[row2][col2], '=', largest)
    return largest
}
