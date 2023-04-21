import { isSuperset } from './set';

describe('set algorithms', () => {
  describe('isSuperset true', () => {
    let res: boolean;
    beforeEach(() => {
      const set = new Set([1, 2, 4, 5, 6, 9]);
      const subset = new Set([2, 4, 9]);
      res = isSuperset(set, subset);
    });
    it('should return true', () => {
      expect(res).toEqual(true);
    });
  });

  describe('isSuperset false', () => {
    let res: boolean;
    beforeEach(() => {
      const set = new Set([1, 2, 4, 5]);
      const subset = new Set([2, 4, 9]);
      res = isSuperset(set, subset);
    });
    it('should return false', () => {
      expect(res).toEqual(false);
    });
  });
});
