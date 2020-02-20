import { Observable, Subscriber, Observer, fromEvent, Subject, BehaviorSubject, ReplaySubject, AsyncSubject } from 'rxjs';

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
 */
const asyncSubject: AsyncSubject<string> = new AsyncSubject();

asyncSubject.subscribe(
  data => addItem('AsyncSubject A: ' + data)
);

let j = 1;
const interval = setInterval(() => asyncSubject.next(''+j++), 100);

setTimeout(() => {
  asyncSubject.subscribe(
    data => addItem('AsyncSubject B: ' + data)
  )
  asyncSubject.complete();
}, 500);

setTimeout(() => {
  clearInterval(interval);
}, 1000);

/**
 * Operators
 * Functions that modify an observable and return a new observable
 * Pure functions
 * Static functions typically used for creation
 * Instance functions most common operators
 */
47:46
