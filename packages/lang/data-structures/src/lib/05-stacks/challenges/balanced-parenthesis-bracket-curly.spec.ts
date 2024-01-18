import { isBalanced } from './balanced-parenthesis-bracket-curly';

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

  describe('and a balanced str foo(aa[i], {bar: [0,12]})', () => {
    let result: boolean;
    beforeEach(() => {
      result = isBalanced('foo(aa[i], {bar: [0,12]})');
    });
    it('should return true', () => {
      expect(result).toEqual(true);
    });
  });

  describe('and a balanced str console.log()', () => {
    let result: boolean;
    beforeEach(() => {
      result = isBalanced('console.log()');
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

  describe('and an unbalanced str foo(3 * ((1 + 4) / 2)', () => {
    let result: boolean;
    beforeEach(() => {
      result = isBalanced('foo(3 * ((1 + 4) / 2)');
    });
    it('should return false', () => {
      expect(result).toEqual(false);
    });
  });
});
