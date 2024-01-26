# Big-O

Big O is a way to categorize your algorithms time or memory requirements based on input. It is not meant to be an exact measurement. It will not tell you how many CPU cycles it takes, instead it is meant to generalize the growth of your algorithm.

Growth is with respect to input.
Simplest trick is to look for loops.
Always drop constants.
In BigO we often consider the worst case.

## Important concepts
1. Growth is with respect to input
2. Constants are dropped
3. Worst case is usually the way we measure

## Big-O Complexity
1. O(1)
2. O(logn)
3. O(n)
4. O(nlogn) Very common runtime you'll see
5. O(n^2)
6. O(2^n) Algorithms that can't run on modern computers
7. O(n!) Algorithms that can't run on modern computers

### Some examples
#### O(N^2)
```javascript
function sum_char_codes(n: string): number {
    let sum = 0;
    for (let i = 0; i < n.length; ++i) {
        for (let j = 0; j < n.length; ++j) {
            sum += charCode;
        }
    }

    return sum;
}
```
#### O(N^3)
```javascript
function sum_char_codes(n: string): number {
    let sum = 0;
    for (let i = 0; i < n.length; ++i) {
        for (let j = 0; j < n.length; ++j) {
            for (let k = 0; k < n.length; ++k) {
                sum += charCode;
            }
        }
    }
    return sum;
}
```
#### O(n log n)
Quicksort (we will implement and explain)

#### O(log n)
Binary search trees

#### Big O trick:
If the input halves at each step, its likely O(LogN) or O(NlogN)
