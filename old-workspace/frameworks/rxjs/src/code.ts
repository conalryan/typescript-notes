import { interval, Observable, Subscriber, Observer, fromEvent, Subject, BehaviorSubject, ReplaySubject, AsyncSubject, merge, from, concat, of, timer, combineLatest, forkJoin } from 'rxjs';
import { map, pluck, mapTo } from 'rxjs/operators';
import { merge as mergeOp } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

/**
 * Observable
 * Cold - Producer won't start emitting values, until an observer has subscribed
 */
const observable = Observable.create((observer: any) => {
  observer.next('Hello world');
  setInterval(() => {
    observer.next('again');
  }, 1000);
  observer.next('Goodbye world');
  setInterval(() => {
    observer.complete();
    console.log('Complete called');
    observer.next('This will not send');
  }, 5000);
});

/**
 * HotObservable emits values outside of any observer subscribing.
 * e.g. mouse movement, the observer only wants values after subscribing, it doesn't care where the mouse was at the start of the app
 */
const hotObservable = fromEvent(document, 'mousemove');
console.log(hotObservable);

/**
 * Observer
 * Typed interface with 3 methods next, error, complete
 * Listens, then reacts to events by executing the provided function
 */
const observer: Observer<string> = {
  next: (msg: string): void => addItem(msg),
  error: (error: any): void => addItem(error),
  complete: (): void => addItem('Complete')
};

/**
 * Subscriber
 * Use to unsubscrbie fron an observable
 */
const subscriber: Subscriber<string> = observable.subscribe(observer);

setTimeout(() => {
  console.log('unsubscribing');
  // Note: if you want to unsubscribe multiple observers you can use
  // subscriber.add(otherObserver); or subsriber.remove(otherObserver) to chain observer lifecycles together
  subscriber.unsubscribe()
}, 3001);

// Inline observer
observable.subscribe(
  (msg: string) => console.log(`inline observer: ${msg}`),
  (error: any) => console.log(`inline observer: ${error}`),
  () => console.log(`inline observer: Complete`)
);

function addItem(msg: string) {
    const node = document.createElement("li");
    const textnode = document.createTextNode(msg);
    node.appendChild(textnode);
    document.getElementById("output").appendChild(node);
}

/**
 * Subject
 * Are Observable and Observer
 */
const subject: Subject<string> = new Subject();

subject.subscribe(
  data => addItem('subject A: ' + data)
);

subject.next('One');

subject.subscribe(
  data => addItem('subject B: ' + data)
);

subject.next('Two');

/**
 * BehaviorSubject
 * Emits last value on subscription
 */
const behaviorSubject: BehaviorSubject<string> = new BehaviorSubject('initial value');

behaviorSubject.subscribe(
  data => addItem('BehaviorSubject A: ' + data)
);

behaviorSubject.next('One');

behaviorSubject.subscribe(
  data => addItem('BehaviorSubject B: ' + data)
);

behaviorSubject.next('Two');

/**
 * ReplaySubject
 * Emits last n value on subscription
 * First argument is last number of event to emit
 * Optional second argument is winodw (time in milliseconds) that last n events must occur within
 */
const replaySubject: ReplaySubject<string> = new ReplaySubject(2);

replaySubject.subscribe(
  data => addItem('ReplaySubject A: ' + data)
);

replaySubject.next('One');

replaySubject.next('Two');

replaySubject.next('Three');

replaySubject.subscribe(
  data => addItem('ReplaySubject B: ' + data)
);

// Example adding window
const replaySubjectWindow: ReplaySubject<string> = new ReplaySubject(30, 200);

replaySubjectWindow.subscribe(
  data => addItem('ReplaySubject Window A: ' + data)
);

let i = 1;
const replayInterval = setInterval(() => replaySubjectWindow.next(''+i++), 100);

setTimeout(() => {
  replaySubjectWindow.subscribe(
    data => addItem('ReplaySubject Window B: ' + data)
  )
}, 500);

setTimeout(() => {
  replaySubjectWindow.complete();
  clearInterval(replayInterval);
  console.log('Complete ReplaySubject Window called');
}, 1000);

/**
 * AsyncSubject
 * Only emits last value and only emits once complete method has been called
 * cr. If it only emits the last value, then shouldn't it just emit a single value?
 * What's the point of emitting values that have no impact?
 */
const asyncSubject: AsyncSubject<string> = new AsyncSubject();

asyncSubject.subscribe(
  data => addItem('AsyncSubject A: ' + data)
);

let j = 1;
const intervalAsync = setInterval(() => asyncSubject.next(''+j++), 100);

setTimeout(() => {
  asyncSubject.subscribe(
    data => addItem('AsyncSubject B: ' + data)
  )
  asyncSubject.complete();
}, 500);

setTimeout(() => {
  clearInterval(intervalAsync);
}, 1000);


/**
 * Operators
 * Functions that modify an observable and return a new observable
 * Pure functions
 * Static functions typically used for creation
 * Instance functions most common operators
 */

const observable1 = Observable.create((observer: Observer<any>) => {
  observer.next('Hello world');
});

const observable2 = Observable.create((observer: Observer<any>) => {
  observer.next('Goodbye world');
});

const every3sec$ = interval(3000);
const every2sec$ = interval(2000);
const every1sec$ = interval(1000);

const after3sec$ = Observable.create((observer: Observer<any>) => {
  setTimeout(() => {
    observer.next('3 sec passed');
  }, 3000);
});

const after2sec$ = Observable.create((observer: Observer<any>) => {
  setTimeout(() => {
    observer.next('2 sec passed');
  }, 2000);
});


const after1sec$ = Observable.create((observer: Observer<any>) => {
  setTimeout(() => {
    observer.next('1 sec passed');
  }, 1000);
});


/**
 * CombineLatest 
 * combineLatest(observables: ...Observable, project: function): Observable
 * When any observable emits a value, emit the last emitted value from each.
 * combineAll can be used to apply combineLatest to emitted observables when a source completes!
 * 
 * Why use combineLatest?
 * operator best used with multiple, long-lived observables that rely on each other for some calculation or determination.
 * combineLatest will not emit an initial value until each observable emits at least one value.
 * This is the same behavior as withLatestFrom 
 * If working with observables that only emit one value, or only require last value of each before completion, 
 * forkJoin is likely a better option.
 */
combineLatest(after3sec$, after2sec$, after1sec$).subscribe(
  ([after3sec, after2sec, after1sec]) => {
    console.log(
      `combineLatest 3 sec : ${after3sec},
       combineLatest 2 sec: ${after2sec},
       combineLatest 1 sec: ${after1sec}`
    );
  }
);


/**
 * Concat
 * concat(observables: ...*): Observable
 * You can think of concat like a line at a ATM, the next transaction (subscription) cannot start until the previous completes!
 * If throughput, not order, is a primary concern try merge instead!
 * (Warning!) concat with source that does not complete
 */
concat(
  of(4, 5, 6),
  // subscribed after first completes
  of(1, 2, 3),
  // subscribed after second completes
  of(7, 8, 9)
)
.subscribe((val: number) => console.log(`concat A: ${val}`)); // 4 , 5, 6, 1, 2, 3, 7, 8, 9


/**
 * ForkJoin
 * forkJoin(...args, selector : function): Observable
 * When all observables complete, emit the last emitted value from each.
 * If you want corresponding emissions from multiple observables as they occur, try zip!
⚠* If an inner observable does not complete forkJoin will never emit a value!
 * Why use forkJoin?
 * Best used with a group of observables and only care about the final emitted value of each.
 * Common use case: issue multiple requests on page load and only want to take action when a response received for all.
 * Similar to how you might use Promise.all.
 * If you have an observable that emits more than one item, and you need previous emissions 
 * forkJoin is not the correct choice, better off with an operator like combineLatest or zip.
 */
forkJoin(
  {
    google: ajax.getJSON('https://api.github.com/users/google'),
    microsoft: ajax.getJSON('https://api.github.com/users/microsoft'),
    users: ajax.getJSON('https://api.github.com/users')
  }
)
  // { google: object, microsoft: object, users: array }
  .subscribe((obj: any) => {
    console.log(obj);
  });

forkJoin(after3sec$, after2sec$, after1sec$).subscribe(
  ([after3sec, after2sec, after1sec]) => {
    console.log(
      `This won't print, since the obsevables never complete
       ForkJoin 3 sec : ${after3sec},
       ForkJoin 2 sec: ${after2sec},
       ForkJoin 1 sec: ${after1sec}`
    );
  }
);


/**
 * Merge
 * merge(input: Observable): Observable
 * Order is not guaranteed, if order is important, use `concat`
 */
const mergedObservable: Observable<any> = merge(observable1, observable2);
mergedObservable.subscribe((x: string) => addItem(`merge A: ${x}`));


// Static Merge
//emit outputs from one observable
const staticMerge = merge(
  every3sec$.pipe(mapTo('every 3')),
  every2sec$.pipe(mapTo('every 2')),
  every1sec$.pipe(mapTo('every 1'))
);
const staticMergeSub = staticMerge.subscribe(val => console.log(`static merge A: ${val}`));
setTimeout(() => {
  staticMergeSub.unsubscribe();
}, 6000);


// Instance Merge
// Note you will need to use the merge operator from rxjs/operators
const instanceMerge = every3sec$.pipe(mergeOp(every2sec$));
const instanceMergeSub = instanceMerge.subscribe((val: number) => console.log(`instance merge A: ${val}`));
setTimeout(() => {
  instanceMergeSub.unsubscribe();
}, 6000);


/**
 * Map
 * Take an observable, perform some observation and return a new observable
 */
const mappedObserable = observable1.pipe(map((x: string) => x.toUpperCase()));
mappedObserable.subscribe((x: string) => addItem(`map A: ${x}`));


/**
 * Pluck
 */
from([
  { first: 'Gary', last: 'Simon', age: '34' },
  { first: 'Jane', last: 'Simon', age: '36' },
  { first: 'John', last: 'Doe', age: '22' }
])
.pipe(
  pluck('first')
)
.subscribe((first: string) => addItem(`pluck A: ${first}`));
