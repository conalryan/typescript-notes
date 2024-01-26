import { List } from "./list";

export class ArrayList<T> implements List<T> {
  length: number;
  private arr: T[];
  private capacity: number;

  constructor() {
    this.length = 0;
    this.capacity = 10
    this.arr = new Array<T>(this.capacity);
  }

  append(item: T): void {
    if (this.length + 1 > this.capacity) {
      this.growArray();
    }
    this.arr[this.length] = item;
    this.length++;
  }

  get(idx: number): T | undefined {
    return idx > -1 && idx < this.length ? this.arr[idx] : undefined;
  }

  insertAt(item: T, idx: number): void {
    if (idx < 0 || idx >= this.length) {
      throw new Error('ERROR: Index out of bounds');
    }

    if (this.length + 1 > this.capacity) {
      this.growArray();
    }

    // fron last to first
    for (let i = this.length; i > idx; i--) {
      this.arr[i] = this.arr[i - 1];
    }

    this.arr[idx] = item;
    this.length++;
  }

  prepend(item: T): void {
    if (this.length + 1 > this.capacity) {
      this.growArray();
    }

    // fron last to first
    for (let i = this.length; i > 0; i--) {
      this.arr[i] = this.arr[i - 1];
    }

    this.arr[0] = item;
    this.length++;
  }

  /** Remove the item and fill in the space */
  remove(item: T): T | undefined {
    let itemIdx = -1;
    for (let i = 0; i < this.length; i++) {
      if (this.arr[i] === item) {
        itemIdx = i;
        break;
      }
    }

    if (itemIdx < 0) {
      // Either throw new Error('ERROR: Index out of bounds');
      // or return;
      return undefined;
    }

    const removedItem = this.arr[itemIdx] as T;

    for (let i = itemIdx; i < this.length -1; i++) {
      this.arr[i] = this.arr[i + 1];
    }

    this.length--;
    this.arr[this.length] = undefined as T;

    return removedItem;
  }

  /** Remove the item and fill in the space */
  removeAt(idx: number): T | undefined {
    if (idx < 0 || idx >= this.length) {
      // Either throw new Error('ERROR: Index out of bounds');
      // or return;
      return undefined;
    }

    const removedItem = this.arr[idx] as T;

    for (let i = idx; i < this.length -1; i++) {
      this.arr[i] = this.arr[i + 1];
    }

    this.length--;
    this.arr[this.length] = undefined as T;

    return removedItem;
  }

  concat(other: ArrayList<T>): ArrayList<T> {
    const result = new ArrayList<T>()
    for (let i = 0; i < this.length; i++) {
        result.append(this.get(i) as T);
    }
    for (let i = 0; i < other.length; i++) {
        result.append(other.get(i) as T);
    }
    return result;
}

  private growArray(): void {
    this.capacity *= 2;
    const arr = new Array<T>(this.capacity);
    for (let i = 0; i < this.length; i++) {
      arr[i] = this.arr[i];
    }
    this.arr = arr;
  }
}
