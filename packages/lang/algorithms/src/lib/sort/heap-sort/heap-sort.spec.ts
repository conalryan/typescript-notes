import { heapSort } from './heap-sort';

describe('heap sort', () => {
  describe('given an 6 element unsorted array of numbers', () => {
    let items: any[];
    let result: any;
    beforeEach(() => {
      items = [5, 3, 16, 2, 10, 14];
      result = [2, 3, 5, 10, 14, 16];
      heapSort(items)
    });

    it('should return a sorted array', () => {
      expect(items).toEqual(result);
    });
  });

  describe('given another 6 element unsorted array of number', () => {
    let items: any[];
    let result: any;
    beforeEach(() => {
      items = [8, 11, 9, 2, 10, 16];
      result = [2, 8, 9, 10, 11, 16];
      heapSort(items)
    });

    it('should return a sorted array', () => {
      expect(items).toEqual(result);
      // FAIL
      //   - Expected  - 1
      // + Received  + 1
      //   Array [
      //     2,
      //     8,
      //     9,
      //     10,
      // -   11,
      //     16,
      // +   11,
    });
  });

  describe('given an 4 element unsorted array', () => {
    let items: any[];
    let result: any;
    beforeEach(() => {
      items = ['a', 'c', 'b', 'z'];
      result = ['a', 'b', 'c', 'z'];
      heapSort(items)
    });

    it('should return a sorted array', () => {
      expect(items).toEqual(result);
      // FAIL
      // - Expected  - 1
      // + Received  + 1
      //   Array [
      //     "a",
      //     "b",
      // -   "c",
      //     "z",
      // +   "c",
    });
  });

  describe('given an 6 element unsorted array', () => {
    let items: any[];
    let result: any;
    beforeEach(() => {
      items = ['a', 'c', 'b', 'z', 'e', 'f'];
      result = ['a', 'b', 'c', 'e', 'f', 'z'];
      heapSort(items)
    });

    it('should return a sorted array', () => {
      expect(items).toEqual(result);
    });
  });

  describe('given an 7 element unsorted array', () => {
    let items: any[];
    let result: any;
    beforeEach(() => {
      items = ['a', 'c', 'b', 'z', 'e'];
      result = ['a', 'b', 'c', 'e', 'z'];
      heapSort(items)
    });

    it('should return a sorted array', () => {
      expect(items).toEqual(result);
      // FAIL
      // - Expected  - 2
      // + Received  + 2
      //   Array [
      // -   "a",
      //     "b",
      //     "c",
      // -   "e",
      //     "z",
      // +   "e",
      // +   "a",
    });
  });

  describe('given an 8 element unsorted array', () => {
    let items: any[];
    let result: any;
    beforeEach(() => {
      items = ['a', 'c', 'b', 'z', 'e', 'f', 'g', 'd'];
      result = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'z'];
      heapSort(items)
    });

    it('should return a sorted array', () => {
      expect(items).toEqual(result);
    });
  });
});
