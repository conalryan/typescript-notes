import { isBalanced } from './balanced-parenthesis';

describe('given the function isBalanced', () => {
  describe('and a balanced str ()', () => {
    let result: boolean;
    beforeEach(() => {
      result = isBalanced('()');
    });
    it('should return true', () => {
      expect(result).toEqual(true);
    });
  });

  describe('and a balanced str (())', () => {
    let result: boolean;
    beforeEach(() => {
      result = isBalanced('(())');
    });
    it('should return true', () => {
      expect(result).toEqual(true);
    });
  });

  describe('and a balanced str ((()))', () => {
    let result: boolean;
    beforeEach(() => {
      result = isBalanced('((()))');
    });
    it('should return true', () => {
      expect(result).toEqual(true);
    });
  });

  describe('and an unbalanced str (', () => {
    let result: boolean;
    beforeEach(() => {
      result = isBalanced('(');
    });
    it('should return false', () => {
      expect(result).toEqual(false);
    });
  });

  describe('and an unbalanced str )', () => {
    let result: boolean;
    beforeEach(() => {
      result = isBalanced(')');
    });
    it('should return false', () => {
      expect(result).toEqual(false);
    });
  });

  describe('and an unbalanced str )(', () => {
    let result: boolean;
    beforeEach(() => {
      result = isBalanced(')(');
    });
    it('should return false', () => {
      expect(result).toEqual(false);
    });
  });

  describe('and an unbalanced str (()', () => {
    let result: boolean;
    beforeEach(() => {
      result = isBalanced('(()');
    });
    it('should return false', () => {
      expect(result).toEqual(false);
    });
  });

  describe('and an unbalanced str ())', () => {
    let result: boolean;
    beforeEach(() => {
      result = isBalanced('())');
    });
    it('should return false', () => {
      expect(result).toEqual(false);
    });
  });
})
