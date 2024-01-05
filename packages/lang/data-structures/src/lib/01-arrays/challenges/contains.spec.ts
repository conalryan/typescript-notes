import { contains } from './contains';

describe('given the contains function', () => {
  describe('and an array', () => {
    describe('and a value within the array', () => {
      let result: boolean;
      beforeEach(() => {
        const arr = [14, 55, 67, 88];
        result = contains(arr, 67);
      });
      it('should return true', () => {
        expect(result).toEqual(true);
      });
    });

    describe('and a value not in the array', () => {
      let result: boolean;
      beforeEach(() => {
        const arr = [14, 55, 67, 88];
        result = contains(arr, 68);
      });
      it('should return false', () => {
        expect(result).toEqual(false);
      });
    });
  });
});
