import { largestProduct } from './largest-product';

describe('largestProduct', () => {
  let result: number;
  beforeEach(() => {
    const arr = [
      [32, 45, 67, 99],
      [93, 34, 88, 12],
      [32, 76, 22, 74],
      [77, 33, 88, 99],
    ];
    result = largestProduct(arr);
  });

  it('should return correct product', () => {
    expect(result).toEqual(8712)
  });
});

