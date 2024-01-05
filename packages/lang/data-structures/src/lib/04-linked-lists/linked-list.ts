export type SingleLinkedNode<T> = {
  value: T,
  next?: SingleLinkedNode<T>,
};

export type DoubleLinkedNode<T> = {
  value: T,
  next?: DoubleLinkedNode<T>,
  prev?: DoubleLinkedNode<T>,
};

export type QueueNode<T> = {
  value: T,
  next?: QueueNode<T>,
};

export type StackNode<T> = {
  value: T,
  prev?: StackNode<T>,
};

export interface LinkedList<T> {
  append(item: T): void;
  get(iitem: T): T | undefined;
  prepend(item: T): void;
  remove(item: T): T | undefined;
}
