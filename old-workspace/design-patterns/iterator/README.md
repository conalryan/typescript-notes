[Iterator Pattern](https://en.wikipedia.org/wiki/Iterator_pattern)
================================================================================

Quick Guide
--------------------------------------------------------------------------------
`tsc -t "ES2020" iterator.ts`

`node iterator.js`


an iterator is used to traverse a container and access the container's elements. The iterator pattern decouples algorithms from containers; in some cases, algorithms are necessarily container-specific and thus cannot be decoupled.

SearchForElement can be implemented generally using a specified type of iterator rather than implementing it as a container-specific algorithm. This allows SearchForElement to be used on any container that supports the required type of iterator.


What problems can the Iterator design pattern solve?
--------------------------------------------------------------------------------
- The elements of an aggregate object should be accessed and traversed without exposing its representation (data structures).
- New traversal operations should be defined for an aggregate object without changing its interface.

Defining access and traversal operations in the aggregate interface is inflexible because it commits the aggregate to particular access and traversal operations and makes it impossible to add new operations later without having to change the aggregate interface.


What solution does the Iterator design pattern describe?
--------------------------------------------------------------------------------
- Define a separate (iterator) object that encapsulates accessing and traversing an aggregate object.
- Clients use an iterator to access and traverse an aggregate without knowing its representation (data structures).

Different iterators can be used to access and traverse an aggregate in different ways.
New access and traversal operations can be defined independently by defining new iterators.

 The essence of the Iterator Pattern is to "Provide a way to access the elements of an aggregate object sequentially without exposing its underlying representation.".
