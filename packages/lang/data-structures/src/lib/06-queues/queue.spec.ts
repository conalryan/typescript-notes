import { Queue } from './queue';

describe('Queue<T> class', () => {
  describe('given the constructor', () => {
    let q: Queue<number>;
    beforeEach(() => {
      q = new Queue<number>;
    });
    it('should have the correct length', () => {
      expect(q.length).toEqual(0);
    });
  });

  describe('given the enqueue method', () => {
    describe('and no items in the queue', () => {
      let q: Queue<number>
      beforeEach(() => {
        q = new Queue<number>();
        q.enqueue(1);
      });
      it('should have the correct length', () => {
        expect(q.length).toEqual(1);
      });

      it('should have the same head and tail', () => {
        expect(q['head']).toEqual(q['tail']);
      });
    });

    describe('and an item in the queue', () => {
      let q: Queue<number>
      beforeEach(() => {
        q = new Queue<number>();
        q.enqueue(1);
        q.enqueue(2);
      });
      it('should have the correct length', () => {
        expect(q.length).toEqual(2);
      });
      it('should have the same head and tail', () => {
        expect(q['head']).not.toEqual(q['tail']);
      });
      it('should point correctly', () => {
        expect(q['head']?.next).toEqual(q['tail']);
      });
      it('should end correctly', () => {
        expect(q['tail']?.next).toEqual(undefined);
      });
    });
  });

  describe('given the deque method', () => {
    describe('and an item in the queue', () => {
      let q: Queue<number>
      let result: number | undefined;
      beforeEach(() => {
        q = new Queue<number>();
        q.enqueue(1);
        result = q.deque();
      });
      it('should have the correct length', () => {
        expect(q.length).toEqual(0);
      });
      it('should not have a head', () => {
        expect(q['head']).toEqual(undefined);
      });
      it('should not have a tail', () => {
        expect(q['tail']).toEqual(undefined);
      });
    });
  });

  describe('given the peek method', () => {
    describe('and no items in the queue', () => {
      let result: number | undefined;
      beforeEach(() => {
        const q = new Queue<number>();
        result = q.peek();
      });
      it('should be undefined', () => {
        expect(result).toBeUndefined();
      });
    });

    describe('and items in the queue', () => {
      let result: number | undefined;
      beforeEach(() => {
        const q = new Queue<number>();
        q.enqueue(2);
        q.enqueue(1);
        result = q.peek();
      });
      it('should be 2', () => {
        expect(result).toEqual(2);
      });
    });
  });
});
