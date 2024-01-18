import { SingleLinkedNode } from "../linked-list";
import { reverseSingleLinkedListIterative, revertSingleLinkedListRecursive } from "./reverse-single-linked-list";

describe('given the SingleLinkedNode<T> type', () => {
  describe('and a three node linked list', () => {
    let head: SingleLinkedNode<number>;
    beforeEach(() => {
      head = {
        value: 1,
        next: {
          value: 2,
          next: {
            value: 3,
            next: undefined,
          },
        },
      };
    });
    it('should have correct head', () => {
      expect(head.value).toEqual(1);
    });
    it('should have correct head.next', () => {
      expect(head.next?.value).toEqual(2);
    });
    it('should have correct head.next.next', () => {
      expect(head.next?.next?.value).toEqual(3);
    });
  });
});

describe('given the reverseSingleLinkedListIterative<T> function', () => {
  describe('and a three node linked list', () => {
    let head: SingleLinkedNode<number> | undefined;
    beforeEach(() => {
      head = {
        value: 1,
        next: {
          value: 2,
          next: {
            value: 3,
            next: undefined,
          },
        },
      };
      head = reverseSingleLinkedListIterative(head);
    });
    it('should have correct head', () => {
      expect(head?.value).toEqual(3);
    });
    it('should have correct head.next', () => {
      expect(head?.next?.value).toEqual(2);
    });
    it('should have correct head.next.next', () => {
      expect(head?.next?.next?.value).toEqual(1);
    });
  });

  describe('and a four node linked list', () => {
    let head: SingleLinkedNode<number> | undefined;
    beforeEach(() => {
      head = {
        value: 85,
        next: {
          value: 15,
          next: {
            value: 4,
            next: {
              value: 20,
              next: undefined,
            },
          },
        },
      };
      head = reverseSingleLinkedListIterative(head);
    });
    it('should have correct head', () => {
      expect(head?.value).toEqual(20);
    });
    it('should have correct head.next', () => {
      expect(head?.next?.value).toEqual(4);
    });
    it('should have correct head.next.next', () => {
      expect(head?.next?.next?.value).toEqual(15);
    });
    it('should have correct head.next.next.next', () => {
      expect(head?.next?.next?.next?.value).toEqual(85);
    });
  });
});

describe('given the revertSingleLinkedListRecursive<T> function', () => {
  describe('and a three node linked list', () => {
    let head: SingleLinkedNode<number> | undefined;
    beforeEach(() => {
      head = {
        value: 1,
        next: {
          value: 2,
          next: {
            value: 3,
            next: undefined,
          },
        },
      };
      head = revertSingleLinkedListRecursive(head);
    });
    it('should have correct head', () => {
      expect(head?.value).toEqual(3);
    });
    // it('should have correct head.next', () => {
    //   expect(head?.next?.value).toEqual(2);
    // });
    // it('should have correct head.next.next', () => {
    //   expect(head?.next?.next?.value).toEqual(1);
    // });
  });
});
