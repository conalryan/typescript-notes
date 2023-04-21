import { scale } from './scale';

describe('scale', () => {
  let res: any;
  beforeEach(() => {
    res = scale(2, 0, 5, 10, 20);
  });
  it('should return correct', () => {
    expect(res).toEqual(14);
  });
});
