import { SingleLinkedList } from './single-linked-list';

describe('given the SinglelinkedList<T> class', () => {
  describe('and the append method', () => {
    describe('and a single element', () => {
      let list: SingleLinkedList<number>;
      beforeEach(() => {
        list = new SingleLinkedList<number>();
        list.append(1);
      });
      it('should have the correct length', () => {
        expect(list['length']).toEqual(1);
      });
      it('should have the same head and tail', () => {
        expect(list['head']?.value).toEqual(list['tail']?.value);
      });
      it('should have the correct value', () => {
        expect(list['head']?.value).toEqual(1);
      });
    });
    describe('and two elements', () => {
      let list: SingleLinkedList<number>;
      beforeEach(() => {
        list = new SingleLinkedList<number>();
        list.append(1);
        list.append(2);
      });
      it('should have the correct length', () => {
        expect(list['length']).toEqual(2);
      });
      it('should have the same head and tail', () => {
        expect(list['head']).not.toEqual(list['tail']);
      });
      it('should have the correct value', () => {
        expect(list['head']?.value).toEqual(1);
      });
      it('should have the correct value', () => {
        expect(list['tail']?.value).toEqual(2);
      });
    });
    describe('and three elements', () => {
      let list: SingleLinkedList<number>;
      beforeEach(() => {
        list = new SingleLinkedList<number>();
        list.append(1);
        list.append(2);
        list.append(3);
      });
      it('should have the correct length', () => {
        expect(list['length']).toEqual(3);
      });
      it('should have the same head and tail', () => {
        expect(list['head']).not.toEqual(list['tail']);
      });
      it('should have the correct value', () => {
        expect(list['head']?.value).toEqual(1);
      });
      it('should have the correct value', () => {
        expect(list['tail']?.value).toEqual(3);
      });
    });
  });

  describe('and the get method', () => {
    describe('and a single element', () => {
      let list: SingleLinkedList<number>;
      beforeEach(() => {
        list = new SingleLinkedList<number>();
        list.append(1);
      });
      it('should get the element', () => {
        expect(list.get(1)).toEqual(1);
      });
    });
    describe('and two elements', () => {
      let list: SingleLinkedList<number>;
      beforeEach(() => {
        list = new SingleLinkedList<number>();
        list.append(1);
        list.append(2);
      });
      it('should get the element', () => {
        expect(list.get(2)).toEqual(2);
      });
    });
    describe('and three elements', () => {
      let list: SingleLinkedList<number>;
      beforeEach(() => {
        list = new SingleLinkedList<number>();
        list.append(1);
        list.append(2);
        list.append(3);
      });
      it('should get the element', () => {
        expect(list.get(3)).toEqual(3);
      });
    });
  });

  describe('and the prepend method', () => {
    describe('and elements', () => {
      let list: SingleLinkedList<number>;
      beforeEach(() => {
        list = new SingleLinkedList<number>();
        list.prepend(1);
      });
      it('should have the correct length', () => {
        expect(list['length']).toEqual(1);
      });
      it('should have the same head and tail', () => {
        expect(list['head']?.value).toEqual(list['tail']?.value);
      });
      it('should have the correct value', () => {
        expect(list['head']?.value).toEqual(1);
      });
    });
    describe('and two elements', () => {
      let list: SingleLinkedList<number>;
      beforeEach(() => {
        list = new SingleLinkedList<number>();
        list.prepend(1);
        list.prepend(2);
      });
      it('should have the correct length', () => {
        expect(list['length']).toEqual(2);
      });
      it('should have the correct value', () => {
        expect(list['head']?.value).toEqual(2);
      });
      it('should have the correct value', () => {
        expect(list['tail']?.value).toEqual(1);
      });
    });
    describe('and three elements', () => {
      let list: SingleLinkedList<number>;
      beforeEach(() => {
        list = new SingleLinkedList<number>();
        list.prepend(1);
        list.prepend(2);
        list.prepend(3);
      });
      it('should have the correct length', () => {
        expect(list['length']).toEqual(3);
      });
      it('should have the correct value', () => {
        expect(list['head']?.value).toEqual(3);
      });
      it('should have the correct value', () => {
        expect(list['tail']?.value).toEqual(1);
      });
    });
  });

  describe('and the remove method', () => {
    describe('and no elements', () => {
      let result: number | undefined;
      beforeEach(() => {
        const list = new SingleLinkedList<number>();
        result = list.remove(1);
      });
      it('should return undefined', () => {
        expect(result).toBeUndefined();
      });
    });

    describe('and one element', () => {
      const list = new SingleLinkedList<number>();
      let result: number | undefined;
      beforeEach(() => {
        list.append(1);
        result = list.remove(1);
      });
      it('should have the correct length', () => {
        expect(list['length']).toEqual(0);
      });
      it('should return value', () => {
        expect(result).toEqual(1);
      });
    });
    describe('and two elements', () => {
      describe('and remove the head', () => {
        const list = new SingleLinkedList<number>();
        let result: number | undefined;
        beforeEach(() => {
          list.append(1);
          list.append(2);
          result = list.remove(1);

        });
        it('should have the correct length', () => {
          expect(list['length']).toEqual(1);
        });
        it('should have the correct head', () => {
          expect(list['head']?.value).toEqual(2);
        });
        it('should have the correct tail', () => {
          expect(list['tail']?.value).toEqual(2);
        });
        it('should return value', () => {
          expect(result).toEqual(1);
        });
      });
      describe('and remove the tail', () => {
        const list = new SingleLinkedList<number>();
        let result: number | undefined;
        beforeEach(() => {
          list.append(1);
          list.append(2);
          result = list.remove(2);

        });
        it('should have the correct length', () => {
          expect(list['length']).toEqual(1);
        });
        it('should have the correct head', () => {
          expect(list['head']?.value).toEqual(1);
        });
        it('should have the correct tail', () => {
          expect(list['tail']?.value).toEqual(1);
        });
        it('should return value', () => {
          expect(result).toEqual(2);
        });
      });
    });
    describe('and three elements', () => {
      describe('and remove the head', () => {
        const list = new SingleLinkedList<number>();
        let result: number | undefined;
        beforeEach(() => {
          list.append(1);
          list.append(2);
          list.append(3);
          result = list.remove(1);

        });
        it('should have the correct length', () => {
          expect(list['length']).toEqual(2);
        });
        it('should have the correct head', () => {
          expect(list['head']?.value).toEqual(2);
        });
        it('should have the correct tail', () => {
          expect(list['tail']?.value).toEqual(3);
        });
        it('should return value', () => {
          expect(result).toEqual(1);
        });
      });
      describe('and remove the tail', () => {
        const list = new SingleLinkedList<number>();
        let result: number | undefined;
        beforeEach(() => {
          list.append(1);
          list.append(2);
          list.append(3);
          result = list.remove(3);

        });
        it('should have the correct length', () => {
          expect(list['length']).toEqual(2);
        });
        it('should have the correct head', () => {
          expect(list['head']?.value).toEqual(1);
        });
        it('should have the correct tail', () => {
          expect(list['tail']?.value).toEqual(2);
        });
        it('should return value', () => {
          expect(result).toEqual(3);
        });
      });
      describe('and remove the middle', () => {
        const list = new SingleLinkedList<number>();
        let result: number | undefined;
        beforeEach(() => {
          list.append(1);
          list.append(2);
          list.append(3);
          result = list.remove(2);

        });
        it('should have the correct length', () => {
          expect(list['length']).toEqual(2);
        });
        it('should have the correct head', () => {
          expect(list['head']?.value).toEqual(1);
        });
        it('should have the correct tail', () => {
          expect(list['tail']?.value).toEqual(3);
        });
        it('should return value', () => {
          expect(result).toEqual(2);
        });
      });
    });
  });
});

