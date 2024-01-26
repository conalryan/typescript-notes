import { fib } from './fibonocci';

describe('given the fib function', () => {
  describe('and the number 6', () => {
    let result: number;
    beforeEach(() => {
      result = fib(6);
    });
    it('should return correctly', () => {
      expect(result).toEqual(8);
    });
  });

  describe('and the number 10', () => {
    let result: number;
    beforeEach(() => {
      result = fib(10);
    });
    it('should return correctly', () => {
      expect(result).toEqual(55);
    });
  });
});
