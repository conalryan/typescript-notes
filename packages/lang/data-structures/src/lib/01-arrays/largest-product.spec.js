import { largestProduct } from './10-largest-product';

describe('largestProduct', () => {
  let aa
  beforeEach(() => {
    aa = [
      [32, 45, 67, 99],
      [93, 34, 88, 12],
      [32, 76, 22, 74],
      [77, 33, 88, 99],
  ]
  });

  it('should return correct product', () => {
    expect(largestProduct(aa)).toEqual(8712)
  })
});

