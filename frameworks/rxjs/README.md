[rxjs](https://rxjs-dev.firebaseapp.com/)
================================================================================
https://www.youtube.com/watch?v=PhggNGsSQyg&t=2176s
https://github.com/designcourse/rxjs-starter-coursetro

Quick Guide
--------------------------------------------------------------------------------
`yarn install`
`yarn run start`

Setup
--------------------------------------------------------------------------------
`yarn init -y`

`yarn add rxjs typescript webpack webpack-dev-server ts-loader`

`yarn add webpack-cli --dev`

[ReactiveX](http://reactivex.io/)
--------------------------------------------------------------------------------

An API for asynchronous programming with observable streams

The Observer pattern done right
ReactiveX is a combination of the best ideas from
the Observer pattern, the Iterator pattern, and functional programming

Create
Easily create event streams or data streams.

Combine
Compose and transform streams with query-like operators.

Listen
Subscribe to any observable stream to perform side effects.

Better codebases
Functional
Avoid intricate stateful programs, using clean input/output functions over observable streams.

Less is more
ReactiveX's operators often reduce what was once an elaborate challenge into a few lines of code.

Async error handling
Traditional try/catch is powerless for errors in asynchronous computations, but ReactiveX is equipped with proper mechanisms for handling errors.

Concurrency made easy
Observables and Schedulers in ReactiveX allow the programmer to abstract away low-level threading, synchronization, and concurrency issues.

Reactive Revolution
ReactiveX is more than an API, it's an idea and a breakthrough in programming. It has inspired several other APIs, frameworks, and even programming languages.

[Intro](http://reactivex.io/intro.html)
--------------------------------------------------------------------------------
ReactiveX is a library for composing asynchronous and event-based programs by using observable sequences.

It extends the observer pattern to support sequences of data and/or events and adds operators that allow you to compose sequences together declaratively while abstracting away concerns about things like low-level threading, synchronization, thread-safety, concurrent data structures, and non-blocking I/O.

Observables fill the gap by being the ideal way to access asynchronous sequences of multiple items
single items	multiple items
synchronous	T getData()	Iterable<T> getData()
asynchronous	Future<T> getData()	Observable<T> getData()

### Observables are composable
It is difficult to use Futures to optimally compose conditional asynchronous execution flows (or impossible, since latencies of each request vary at runtime). This can be done, of course, but it quickly becomes complicated (and thus error-prone) or it prematurely blocks on Future.get(), which eliminates the benefit of asynchronous execution.

ReactiveX Observables, on the other hand, are intended for composing flows and sequences of asynchronous data.

### Observables are flexible
ReactiveX Observables support not just the emission of single scalar values (as Futures do), but also of sequences of values or even infinite streams. Observable is a single abstraction that can be used for any of these use cases. An Observable has all of the flexibility and elegance associated with its mirror-image cousin the Iterable.

An Observable is the asynchronous/push “dual” to the synchronous/pull Iterable
event	Iterable (pull)	Observable (push)
retrieve data	T next()	onNext(T)
discover error	throws Exception	onError(Exception)
complete	!hasNext()	onCompleted()

### Observables Are Less Opinionated
ReactiveX is not biased toward some particular source of concurrency or asynchronicity.
Observables can be implemented using:
- thread-pools
- event loops
- non-blocking I/O
- actors (such as from Akka)
- or whatever implementation suits your needs, your style, or your expertise.

Client code treats all of its interactions with Observables as asynchronous, whether your underlying implementation is blocking or non-blocking and however you choose to implement it.

How is this Observable implemented?
`public Observable<data> getData();`
From the Observer’s point of view, it doesn’t matter!
- does it work synchronously on the same thread as the caller?
- does it work asynchronously on a distinct thread?
- does it divide its work over multiple threads that may return data to the caller in any order?
- does it use an Actor (or multiple Actors) instead of a thread pool?
- does it use NIO with an event-loop to do asynchronous network access?
- does it use an event-loop to separate the work thread from the callback thread?

And importantly: with ReactiveX you can later change your mind, and radically change the underlying nature of your Observable implementation, without breaking the consumers of your Observable.

Reactive Programming
ReactiveX provides a collection of operators with which you can filter, select, transform, combine, and compose Observables. This allows for efficient execution and composition.

You can think of the Observable class as a “push” equivalent to Iterable, which is a “pull.” With an Iterable, the consumer pulls values from the producer and the thread blocks until those values arrive. By contrast, with an Observable the producer pushes values to the consumer whenever values are available. This approach is more flexible, because values can arrive synchronously or asynchronously.

The Observable type adds two missing semantics to the Gang of Four’s Observer pattern, to match those that are available in the Iterable type:
- the ability for the producer to signal to the consumer that there is no more data available (a foreach loop on an Iterable completes and returns normally in such a case; an Observable calls its observer’s onCompleted method)
- the ability for the producer to signal to the consumer that an error has occurred (an Iterable throws an exception if an error takes place during iteration; an Observable calls its observer’s onError method)

With these additions, ReactiveX harmonizes the Iterable and Observable types. The only difference between them is the direction in which the data flows. This is very important because now any operation you can perform on an Iterable, you can also perform on an Observable.

[Observable](http://reactivex.io/documentation/observable.html)
--------------------------------------------------------------------------------

In ReactiveX an observer subscribes to an Observable. Then that observer reacts to whatever item or sequence of items the Observable emits. This pattern facilitates concurrent operations because it does not need to block while waiting for the Observable to emit objects, but instead it creates a sentry in the form of an observer that stands ready to react appropriately at whatever future time the Observable does so.

There are many terms used to describe this model of asynchronous programming and design. This document will use the following terms: An observer subscribes to an Observable. An Observable emits items or sends notifications to its observers by calling the observers’ methods.

In other documents and other contexts, what we are calling an “observer” is sometimes called a “subscriber,” “watcher,” or “reactor.” This model in general is often referred to as the “reactor pattern”.

### Subscribe
The Subscribe method is how you connect an observer to an Observable. Your observer implements some subset of the following methods:

`onNext`
An Observable calls this method whenever the Observable emits an item. This method takes as a parameter the item emitted by the Observable.
`onError`
An Observable calls this method to indicate that it has failed to generate the expected data or has encountered some other error. It will not make further calls to onNext or onCompleted. The onError method takes as its parameter an indication of what caused the error.
`onCompleted`
An Observable calls this method after it has called onNext for the final time, if it has not encountered any errors.

### Hot and Cold
A “hot” Observable may begin emitting items as soon as it is created, and so any observer who later subscribes to that Observable may start observing the sequence somewhere in the middle.

A “cold” Observable, on the other hand, waits until an observer subscribes to it before it begins to emit items, and so such an observer is guaranteed to see the whole sequence from the beginning.

a “Connectable” Observable. Such an Observable does not begin emitting items until its Connect method is called, whether or not any observers have subscribed to it.

[Operators](http://reactivex.io/documentation/operators.html)
--------------------------------------------------------------------------------

### Composition via Operators
operators that allow you to transform, combine, manipulate, and work with the sequences of items emitted by Observables.

Creating Observables
`Create, Defer, Empty/Never/Throw, From, Interval, Just, Range, Repeat, Start, and Timer`
Transforming Observable Items
`Buffer, FlatMap, GroupBy, Map, Scan, and Windowi`
Filtering Observables
`Debounce, Distinct, ElementAt, Filter, First, IgnoreElements, Last, Sample, Skip, SkipLast, Take, and TakeLast`
Combining Observables
`And/Then/When, CombineLatest, Join, Merge, StartWith, Switch, and Zip`
Error Handling Operators
`Catch and Retry`
Utility Operators
`Delay, Do, Materialize/Dematerialize, ObserveOn, Serialize, Subscribe, SubscribeOn, TimeInterval, Timeout, Timestamp, and Usingi`
Conditional and Boolean Operators
`All, Amb, Contains, DefaultIfEmpty, SequenceEqual, SkipUntil, SkipWhile, TakeUntil, and TakeWhilei`
Mathematical and Aggregate Operators
`Average, Concat, Count, Max, Min, Reduce, and Sumi`
Converting Observables
`Toi`
Connectable Observable Operators
`Connect, Publish, RefCount, and Replayi`
Backpressure Operators
a variety of operators that enforce particular flow-control policies

### Chaining Operators
Similar to Builder pattern however, with Observable operators order matters.
A chain of Observable operators do not operate independently on the original Observable that originates the chain, but they operate in turn, each one operating on the Observable generated by the operator immediately previous in the chain

### I want to create an Observable by combining other Observables
...and emitting all of the items from all of the Observables in whatever order they are received: `Merge`
...and emitting all of the items from all of the Observables, one Observable at a time: `Concat`
...by combining the items from two or more Observables sequentially to come up with new items to emit
  ...whenever each of the Observables has emitted a new item: `Zip`
  ...whenever any of the Observables has emitted a new item: `CombineLatest`
  ...whenever an item is emitted by one Observable in a window defined by an item emitted by another: `Join`
    ...by means of Pattern and Plan intermediaries: `And/Then/When`
  ...and emitting the items from only the most-recently emitted of those Observables: `Switch`

[Single](http://reactivex.io/documentation/single.html)
--------------------------------------------------------------------------------
RxJava (and its derivatives like RxGroovy & RxScala) has developed an Observable variant called “Single.”

A Single is something like an Observable, but instead of emitting a series of values — anywhere from none at all to an infinite number — it always either emits one value or an error notification.

For this reason, instead of subscribing to a Single with the three methods you use to respond to notifications from an Observable (onNext, onError, and onCompleted), you only use two methods to subscribe:

onSuccess
a Single passes this method the sole item that the Single emits
onError
a Single passes this method the Throwable that caused the Single to be unable to emit an item
A Single will call only one of these methods, and will only call it once. Uon calling either method, the Single terminates and the subscription to it ends.p

[Subject](http://reactivex.io/documentation/subject.html)
--------------------------------------------------------------------------------

A Subject is a sort of bridge or proxy that is available in some implementations of ReactiveX that acts both as an observer and as an Observable. Because it is an observer, it can subscribe to one or more Observables, and because it is an Observable, it can pass through the items it observes by reemitting them, and it can also emit new items.

Because a Subject subscribes to an Observable, it will trigger that Observable to begin emitting items (if that Observable is “cold” — that is, if it waits for a subscription before it begins to emit items). This can have the effect of making the resulting Subject a “hot” Observable variant of the original “cold” Observable.

### AsyncSubject
An AsyncSubject emits the last value (and only the last value) emitted by the source Observable, and only after that source Observable completes. (If the source Observable does not emit any values, the AsyncSubject also completes without emitting any values.)

### BehaviorSubject
When an observer subscribes to a BehaviorSubject, it begins by emitting the item most recently emitted by the source Observable (or a seed/default value if none has yet been emitted) and then continues to emit any other items emitted later by the source Observable(s).

### PublishSubject
PublishSubject emits to an observer only those items that are emitted by the source Observable(s) subsequent to the time of the subscription.

Note that a PublishSubject may begin emitting items immediately upon creation (unless you have taken steps to prevent this), and so there is a risk that one or more items may be lost between the time the Subject is created and the observer subscribes to it. If you need to guarantee delivery of all items from the source Observable, you’ll need either to form that Observable with Create so that you can manually reintroduce “cold” Observable behavior (checking to see that all observers have subscribed before beginning to emit items), or switch to using a ReplaySubject instead.

### ReplaySubject
ReplaySubject emits to any observer all of the items that were emitted by the source Observable(s), regardless of when the observer subscribes.

If you use a ReplaySubject as an observer, take care not to call its onNext method (or its other on methods) from multiple threads, as this could lead to coincident (non-sequential) calls, which violates the Observable contract and creates an ambiguity in the resulting Subject as to which item or notification should be replayed first.

[Scheduler](http://reactivex.io/documentation/scheduler.html)
--------------------------------------------------------------------------------

If you want to introduce multithreading into your cascade of Observable operators, you can do so by instructing those operators (or particular Observables) to operate on particular Schedulers.

Some ReactiveX Observable operators have variants that take a Scheduler as a parameter. These instruct the operator to do some or all of its work on a particular Scheduler.

By default, an Observable and the chain of operators that you apply to it will do its work, and will notify its observers, on the same thread on which its Subscribe method is called. The SubscribeOn operator changes this behavior by specifying a different Scheduler on which the Observable should operate. The ObserveOn operator specifies a different Scheduler that the Observable will use to send notifications to its observers.

As shown in this illustration, the SubscribeOn operator designates which thread the Observable will begin operating on, no matter at what point in the chain of operators that operator is called. ObserveOn, on the other hand, affects the thread that the Observable will use below where that operator appears. For this reason, you may call ObserveOn multiple times at various points during the chain of Observable operators in order to change on which threads certain of those operators operate.


