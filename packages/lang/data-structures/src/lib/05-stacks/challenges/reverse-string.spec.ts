import { reverse } from './reverse-string';

describe('given the function reverse', () => {
  describe('and an ascending sorted string', () => {
    let result: string;
    beforeEach(() => {
      result = reverse('abc');
    });
    it('should reverse string', () => {
      expect(result).toEqual('cba');
    });
  });

  describe('and a descending sorted string', () => {
    let result: string;
    beforeEach(() => {
      result = reverse('edcba');
    });
    it('should reverse string', () => {
      expect(result).toEqual('abcde');
    });
  });
});
