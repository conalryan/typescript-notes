interface Observer<T> {
  notify(value: T): void;
}

interface Subject<T> {
  _observers: Observer<T>[];
  attach(observer: Observer<T>): void;
  detach(observer: Observer<T>): void;
  notify(value: T): void;
}

const s: Subject<string> = {
  _observers: [],

  attach(observer: Observer<string>): void {
    this._observers.push(observer);
  },

  detach(observer: Observer<string>): void {
    const idx = this._observers.indexOf(observer);
    if (idx > -1) {
      this._observers.splice(idx, 1);
    }
  },

  notify(value: any): void {
    this._observers.forEach((observer: Observer<string>) => {
      observer.notify(value);
    });
  }
} as Subject<string>;

const o: Observer<string> = {
  notify(value: string): void {
    console.log(value);
  }
};

s.attach(o);

s.notify('Hello world');

s.detach(o);

s.notify("This won't print");
