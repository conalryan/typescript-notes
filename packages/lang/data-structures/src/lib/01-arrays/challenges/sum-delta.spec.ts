import { sumDelta } from './sum-delta';

describe('given the sumDelta function', () => {
  describe('and a number array',  () => {
    let result: number;
    beforeEach(() => {
      const arr = [2, 6, 12, 19];
      result = sumDelta(arr);
    });
    it('should return the sum of the deltas', () => {
      expect(result).toEqual(17);
    });
  });
});
