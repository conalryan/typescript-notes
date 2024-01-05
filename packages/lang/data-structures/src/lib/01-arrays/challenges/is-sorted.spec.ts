import { isSorted } from './is-sorted';

describe('given the isSorted function', () => {
  describe('and an empty array', () => {
    let result: boolean;
    beforeEach(() => {
      const arr: number[] = [];
      result = isSorted(arr);
    });
    it('should return true', () => {
      expect(result).toEqual(true);
    });
  });

  describe('and an array with one element', () => {
    let result: boolean;
    beforeEach(() => {
      const arr: number[] = [42];
      result = isSorted(arr);
    });
    it('should return true', () => {
      expect(result).toEqual(true);
    });
  });

  describe('and an array that is sorted ascending', () => {
    let result: boolean;
    beforeEach(() => {
      const arr: number[] = [39, 42];
      result = isSorted(arr);
    });
    it('should return true', () => {
      expect(result).toEqual(true);
    });
  });

  describe('and an array that is sorted ascending', () => {
    let result: boolean;
    beforeEach(() => {
      const arr: number[] = [1, 2, 3, 4, 5];
      result = isSorted(arr);
    });
    it('should return true', () => {
      expect(result).toEqual(true);
    });
  });

  describe('and an array that is sorted descending', () => {
    let result: boolean;
    beforeEach(() => {
      const arr: number[] = [5, 4, 3, 2, 1];
      result = isSorted(arr);
    });
    it('should return true', () => {
      expect(result).toEqual(true);
    });
  });


  describe('and an array that is not sorted', () => {
    let result: boolean;
    beforeEach(() => {
      const arr: number[] =  [1, 5, 2]
      result = isSorted(arr);
    });
    it('should return false', () => {
      expect(result).toEqual(false);
    });
  });
});
