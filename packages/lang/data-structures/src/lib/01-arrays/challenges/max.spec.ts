import { max } from './max';

describe('given the function max', () => {
  describe('and an array of numbers', () => {
    let result: number;
    beforeEach(() => {
      const arr = [3, 5, 1, 22, 9, 17];
      result = max(arr);
    });
    it('should return the max value', () => {
      expect(result).toEqual(22);
    });
  });
});
