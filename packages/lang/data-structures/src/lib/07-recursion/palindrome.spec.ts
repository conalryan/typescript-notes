import { isPalindrome } from './palindrome';

describe('given the function isPalindrome', () => {
  describe('and an empty string', () => {
    let result: boolean;
    beforeEach(() => {
      result = isPalindrome('');
    });
    it('should return true', () => {
      expect(result).toEqual(true);
    });
  });

  describe('and the string a', () => {
    let result: boolean;
    beforeEach(() => {
      result = isPalindrome('a');
    });
    it('should return true', () => {
      expect(result).toEqual(true);
    });
  });

  describe('and the string tt', () => {
    let result: boolean;
    beforeEach(() => {
      result = isPalindrome('tt');
    });
    it('should return true', () => {
      expect(result).toEqual(true);
    });
  });

  describe('and the string tot', () => {
    let result: boolean;
    beforeEach(() => {
      result = isPalindrome('tot');
    });
    it('should return true', () => {
      expect(result).toEqual(true);
    });
  });

  describe('and the string tacocat', () => {
    let result: boolean;
    beforeEach(() => {
      result = isPalindrome('tacocat');
    });
    it('should return true', () => {
      expect(result).toEqual(true);
    });
  });

  describe('and the string boring', () => {
    let result: boolean;
    beforeEach(() => {
      result = isPalindrome('boring');
    });
    it('should return false', () => {
      expect(result).toEqual(false);
    });
  });

  describe('and the string abc-xbbby-cba', () => {
    let result: boolean;
    beforeEach(() => {
      result = isPalindrome('abc-xbbby-cba');
    });
    it('should return false', () => {
      expect(result).toEqual(false);
    });
  });
});
