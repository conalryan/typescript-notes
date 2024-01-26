import { primesUpToN } from './sieve-of-eratosthenes';

describe('given the function primesUpToN', () => {
  describe('and the number 5', () => {
    let result: number[];
    beforeEach(() => {
      result = primesUpToN(5);
    });
    it('should return correctly', () => {
      expect(result).toEqual([2, 3]);
    });
  });
});
