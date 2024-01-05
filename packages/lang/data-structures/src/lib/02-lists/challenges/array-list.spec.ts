import { ArrayList } from './array-list';

const generateArrayList = (): ArrayList<number> => {
  const arr = new ArrayList<number>(5);
      arr.append(1);
      arr.append(2);
      arr.append(3);
      arr.append(4);
      arr.append(5);
  return arr;
};

describe('given the ArrayList class', () => {
  describe('and the append method', () => {
    let arr: ArrayList<number>;
    beforeEach(() => {
      arr = generateArrayList();
    });
    it('should have the correct length', () => {
      expect(arr.length).toEqual(5);
    });
    it('should have the correct capacity', () => {
      expect(arr['capacity']).toEqual(5);
    });
  });

  describe('and the get method', () => {
    describe('and a negative index', () => {
      let got: number | undefined;
      beforeEach(() => {
        const arr = generateArrayList();
        got = arr.get(-1);
      });
      it('should return undefined', () => {
        expect(got).toBeUndefined();
      });
    });

    describe('and an index >= the length', () => {
      let got: number | undefined;
      beforeEach(() => {
        const arr = generateArrayList();
        got = arr.get(arr.length);
      });
      it('should return undefined', () => {
        expect(got).toBeUndefined();
      });
    });

    describe('and an index in the array', () => {
      let got: number | undefined;
      beforeEach(() => {
        const arr = generateArrayList();
        got = arr.get(1);
      });
      it('should return undefined', () => {
        expect(got).toEqual(2);
      });
    });
  });

  describe('and the insertAt method', () => {
    describe('and a negative index', () => {
      let err: Error;
      beforeEach(() => {
        try {
          const arr = generateArrayList();
          arr.insertAt(22, -1);
        } catch (e) {
          err = e as Error;
        }
      });
      it('should throw an error', () => {
        expect(err).toBeDefined();
      });
    });
    describe('and an index >= length', () => {
      let err: Error;
      beforeEach(() => {
        try {
          const arr = generateArrayList();
          arr.insertAt(22, arr.length);
        } catch (e) {
          err = e as Error;
        }
      });
      it('should throw an error', () => {
        expect(err).toBeDefined();
      });
    });
    describe('and and the last index', () => {
      let arr: ArrayList<number>;
      beforeEach(() => {
        arr = generateArrayList();
        arr.insertAt(33, 4);
      });
      it('should have the correct length', () => {
        expect(arr.length).toEqual(6);
      });
      it('should have the correct capacity', () => {
        expect(arr['capacity']).toEqual(10);
      });
      it('should insert in correct index', () => {
        expect(arr.get(4)).toEqual(33);
      });
      it('should move the correct index + 1', () => {
        expect(arr.get(5)).toEqual(5);
      });
    });
    describe('and and the first index', () => {
      let arr: ArrayList<number>;
      beforeEach(() => {
        arr = generateArrayList();
        arr.insertAt(11, 0);
      });
      it('should have the correct length', () => {
        expect(arr.length).toEqual(6);
      });
      it('should have the correct capacity', () => {
        expect(arr['capacity']).toEqual(10);
      });
      it('should insert in correct index', () => {
        expect(arr.get(0)).toEqual(11);
      });
      it('should move the correct index + 1', () => {
        expect(arr.get(1)).toEqual(1);
      });
    });
  });

  describe('given the prepend method', () => {
    let arr: ArrayList<number>;
    beforeEach(() => {
      arr = generateArrayList();
      arr.prepend(11);
    });
    it('should have the correct length', () => {
      expect(arr.length).toEqual(6);
    });
    it('should have the correct capacity', () => {
      expect(arr['capacity']).toEqual(10);
    });
    it('should insert in correct index', () => {
      expect(arr.get(0)).toEqual(11);
    });
    it('should move the correct index + 1', () => {
      expect(arr.get(1)).toEqual(1);
    });
  });

  describe('given the remove method', () => {
    describe('and an unfound item', () => {
      let result: number | undefined;
      beforeEach(() => {
        const arr = generateArrayList();
        result = arr.remove(999);
      });
      it('should return undefined', () => {
        expect(result).toBeUndefined();
      });
    });
    describe('and an index', () => {
      let arr: ArrayList<number>;
      let result: number | undefined;
      beforeEach(() => {
        arr = generateArrayList();
        result = arr.remove(2);
      });
      it('should adjest the length', () => {
        expect(arr.length).toEqual(4);
      })
      it('should return removed item', () => {
        expect(result).toEqual(2);
      });

      it('should fill in the empty space', () => {
        expect(arr.get(1)).toEqual(3);
      });

      it('should shif the elements', () => {
        expect(arr.get(2)).toEqual(4);
      });

      it('should not leave a value at the end', () => {
        expect(arr.get(4)).toEqual(undefined);
      });
    });
  });

  describe('given the removeAt method', () => {
    describe('and a negative index', () => {
      let result: number | undefined;
      beforeEach(() => {
        const arr = generateArrayList();
        result = arr.removeAt(-1);
      });
      it('should return undefined', () => {
        expect(result).toBeUndefined();
      });
    });
    describe('and an index >= length', () => {
      let result: number | undefined;
      beforeEach(() => {
        const arr = generateArrayList();
        result = arr.removeAt(arr.length);
      });
      it('should return undefined', () => {
        expect(result).toBeUndefined();
      });
    });
    describe('and an index', () => {
      let arr: ArrayList<number>;
      let result: number | undefined;
      beforeEach(() => {
        arr = generateArrayList();
        result = arr.removeAt(3);
      });
      it('should have the correct length', () => {
        expect(arr.length).toEqual(4);
      });
      it('should have the correct capacity', () => {
        expect(arr['capacity']).toEqual(5);
      });
      it('should remove the correct index', () => {
        expect(result).toEqual(4);
      });
      it('should move the correct index + 1', () => {
        expect(arr.get(1)).toEqual(2);
      });
      it('should not leave a value at the end', () => {
        expect(arr.get(4)).toEqual(undefined);
      });
    });
  });
});;
