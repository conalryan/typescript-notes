[Observer Pattern](https://en.wikipedia.org/wiki/Observer_pattern)
================================================================================

Quick Guide
--------------------------------------------------------------------------------
`tsc observer.ts`

`node observer.js`


An object, called the *subject*, maintains a list of its dependents, called *observers*, and notifies them automatically of any state changes, usually by calling one of their methods.

### Event Driven
It is mainly used to implement distributed event handling systems, in "event driven" software. 

In those systems, the subject is usually called a "stream of events" or "stream source of events", while the observers are called "sink of events".

The stream nomenclature simulates or adapts to a physical setup where the observers are physically separated and have no control over the emitted events of the subject/stream-source.

This pattern then perfectly suits any process where data arrives through I/O, that is, where data is not available to the CPU at startup, but can arrive "randomly" (HTTP requests, GPIO data, user input from keyboard/mouse/..., distributed databases and blockchains, ...).

Most modern languages have built-in "event" constructs which implement the observer pattern components.

While not mandatory most 'observers' implementations will use background threads listening for subject events and other support mechanism from the kernel (Linux epoll, ...)

### The Observer pattern addresses the following problems:
- A one-to-many dependency between objects should be defined without making the objects tightly coupled.
- It should be ensured that when one object changes state an open-ended number of dependent objects are updated automatically.
- It should be possible that one object can notify an open-ended number of other objects.

### Tight Coupling Subect to Observers
Defining a one-to-many dependency between objects by defining one object (subject) that updates the state of dependent objects directly is *inflexible* because it *couples* the subject to particular dependent objects.

Tightly coupled objects can be hard to implement in some scenarios, and reuse because they refer to and know about (how to update) many different objects with different interfaces. In other scenarios tightly coupled objects can be a better option since the compiler will be able to detect errors at compile time and optimize the code at CPU instruction level.

### Solution
Define `Subject` and `Observer` objects.
so that when a subject changes state, all registered observers are notified and updated automatically (and probably asynchronously).

The sole responsibility of a subject is to maintain a list of observers and to notify them of state changes by calling their update() operation.

The responsibility of observers is to register (and unregister) themselves on a subject (to get notified of state changes) and to update their state (synchronize their state with subject's state) when they are notified.

This makes subject and observers *loosely coupled*. Subject and observers have no explicit knowledge of each other. Observers can be added and removed independently at run-time.

This notification-registration interaction is also known as *publish-subscribe*.

### Strong vs Weak and Memory Leaks
The observer pattern can cause memory leaks, known as the lapsed listener problem, because in basic implementation it requires both explicit registration and explicit deregistration, as in the dispose pattern, because the subject holds strong references to the observers, keeping them alive. This can be prevented by the subject holding weak references to the observers.

### Implementation
Typically, the observer pattern is implemented so the "subject" being "observed" is part of the object for which state changes are being observed (and communicated to the observers). This type of implementation is considered "tightly coupled", forcing both the observers and the subject to be aware of each other and have access to their internal parts, creating possible issues of scalability, speed, message recovery and maintenance (also called event or notification loss), the lack of flexibility in conditional dispersion, and possible hindrance to desired security measures.

In some (non-polling) implementations of the publish-subscribe pattern (aka the pub-sub pattern), this is solved by creating a dedicated "message queue" server (and sometimes an extra "message handler" object) as an extra stage between the observer and the object being observed, thus decoupling the components. In these cases, the message queue server is accessed by the observers with the observer pattern, "subscribing to certain messages" knowing only about the expected message (or not, in some cases), while knowing nothing about the message sender itself; the sender also may know nothing about the observers.


