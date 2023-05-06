import { insertionSort } from './insertion-sort';

describe('insertion sort', () => {
  describe('given a small unsorted array', () => {
    let items: any[];
    let result: any;
    beforeEach(() => {
      items = ['a', 'c', 'b'];
      result = ['a', 'b', 'c'];
      insertionSort(items)
    });

    it('should return a sorted array', () => {
      expect(items).toEqual(result);
    });
  });

  describe('given a worst case unsorted array', () => {
    let items: any[];
    let result: any;
    beforeEach(() => {
      items = ['z', 'c', 'b', 'a'];
      result = ['a', 'b', 'c', 'z'];
      insertionSort(items)
    });

    it('should return a sorted array', () => {
      expect(items).toEqual(result);
    });
  });
});
