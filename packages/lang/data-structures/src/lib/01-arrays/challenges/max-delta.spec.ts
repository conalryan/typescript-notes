import { maxDeltaZeroIndex, maxDeltaOneIndex } from './max-delta';

describe('given the maxDeltaZeroIndex function', () => {
  describe('and an array of numbers', () => {
    let result: number;
    beforeEach(() => {
      const arr = [70, 72, 68, 65, 74, 74, 73];
      result = maxDeltaZeroIndex(arr);
    });
    it('should return the max delta', () => {
      expect(result).toEqual(9);
    });
  });
});

describe('given the maxDeltaOneIndex function', () => {
  describe('and an array of numbers', () => {
    let result: number;
    beforeEach(() => {
      const arr = [70, 72, 68, 65, 74, 74, 73];
      result = maxDeltaOneIndex(arr);
    });
    it('should return the max delta', () => {
      expect(result).toEqual(9);
    });
  });
});
