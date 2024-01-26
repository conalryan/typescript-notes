/**
 * return the nth fibonocci number
 * fib(1) = 1
 * fib(2) = 1
 * fib(6) = 8
 * fib(10) = 55
 * 1 1 2 3 5 8 13 21 34 55
 */
export const fib = (n: number): number => {
  // base case
  if (n === 1 || n === 2) {
    return 1;
  }

  // recurse
  return fib(n - 1) + fib(n - 2);
};
