interface Observer {
  notify(value: any): void;
}

interface Subject {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(value: any): void;
}

const s = {
  _observers: [],

  attach(observer: Observer): void {
    this._observers.push(observer);
  },
 
  detach(observer: Observer): void {
    const idx = this._observers.indexOf(observer);
    if (idx > -1) {
      this._observers.splice(idx, 1);
    }
  },

  notify(value: any): void {
    this._observers.forEach((observer: Observer) => {
      observer.notify(value);
    });
  }
} as Subject;

const o: Observer = {
  notify(value: any): void {
    console.log(value);
  }
};

s.attach(o);

s.notify('Hello world');

s.detach(o);

s.notify("This won't print");
