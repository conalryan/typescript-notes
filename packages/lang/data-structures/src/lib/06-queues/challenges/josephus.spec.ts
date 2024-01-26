import { josephus } from './josephus';

describe('josephus', () => {
  describe('and the choices [A, B, C]', () => {
    describe('and n is 2', () => {
      let result: string | undefined;
      beforeEach(() => {
        result = josephus('ABC'.split(''), 2);
      });
      it('shoud return the correct string', () => {
        expect(result).toEqual('A');
      });
    });

    describe('and n is 3', () => {
      let result: string | undefined;
      beforeEach(() => {
        result = josephus('ABC'.split(''), 3);
      });
      it('shoud return the correct string', () => {
        expect(result).toEqual('C');
      });
    });
  });

  describe('and the choices [A, B, C, D, E, F]', () => {
    describe('and n is 3', () => {
      let result: string | undefined;
      beforeEach(() => {
        result = josephus('ABCDEF'.split(''), 3);
      });
      it('shoud return the correct string', () => {
        expect(result).toEqual('B');
      });
    });
  });
});
