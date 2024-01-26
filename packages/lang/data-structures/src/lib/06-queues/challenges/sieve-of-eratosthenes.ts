import { Queue } from '../queue';

/**
 * accept an integer N and return all the prime numbers
 * from 2 up to (but not including) n. Return the prime
 * numbers as an array. Use two queues to implement the
 * sieve of Eratosthenes.
 */
export const primesUpToN = (n: number): number[] => {
  let q = new Queue<number>();

  // add all the numbers from 2 up to N into the q
  for (let i = 2; i < n; i++) {
    q.enqueue(i);
  }

  const primes: number[] = [];
  let q2 = new Queue<number>();

  while (q.length >= 1) {
    // add the first number in the queue as a prime in the prime array
    const prime: number = q.deque() as number;
    primes.push(prime);

    while (q.length > 0) {
      const num: number = q.deque() as number;
      if (num % prime !== 0) {
        q2.enqueue(num);
      }
    }

    // swap the queues so q has numbers and q2 is empty
    const temp = q;
    q = q2;
    q2 = temp;
  }

  return primes;
};
