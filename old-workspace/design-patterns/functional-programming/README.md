[Functional Programming](https://en.wikipedia.org/wiki/Functional_programming)
================================================================================

A programming paradigm, or style of building computer programs—that treats computation as the evaluation of mathematical functions and avoids changing-state and mutable data.

It is a *declarative* programming paradigm in that programming is done with *expressions* or *declarations* instead of statements.

In functional code, the output value of a function depends only on its arguments, so calling a function with the same value for an argument always produces the same result.

This is in contrast to *imperative* programming where, in addition to a function's arguments, global program state can affect a function's resulting value (called *side effects*).

One of the key motivations for the development of functional programming is making a program easier to nderstand by eliminating changes in state that do not depend on function inputs which are called side effects.

Functional programming has its origins in *lambda calculus*, a formal system developed in the 1930s to investigate computability, the Entscheidungsproblem, function definition, function application, and recursion.

Many functional programming languages can be viewed as elaborations on the lambda calculus.

In contrast, *imperative* programming changes state with statements in the source code, the simplest example being assignment.

Imperative programming has *subroutines*, but these are not mathematical functions.
They can have side effects that may change a program's state, allowing for functions without return values.
Because of this, they lack referential transparency, that is, the same language expression can result in different values at different times depending on the state of the executing program.

### Languages
- Common Lisp
- Clojure
- Erlang
- OCaml
- Haskell
- Julia

Languages with functional properties
- Javascript
- XQuery
- XSLT
- SQL
- C++
- Kotlin
- Scala

### First-class and higher-order functions
Higher-order functions are functions that can either take other functions as arguments or return them as results. In calculus, an example of a higher-order function is the differential operator d/dx, which returns the derivative of a function.

Higher-order functions are closely related to first-class functions in that higher-order functions and first-class functions both allow functions as arguments and results of other functions. The distinction between the two is subtle: "higher-order" describes a mathematical concept of functions that operate on other functions, while "first-class" is a computer science term tat describes programming language entities that have no restriction on their use (thus first-class functions can appear anywhere in the program that other first-class entities like numbers can, including as arguments to other functions and as their return values).

Higher-order functions enable partial application or currying, a technique that applies a function to its arguments one at a time, with each application returning a new function that accepts the next argument. This lets a programmer succinctly express, for example, the successor function as the addition operator partially applied to the natural number one.h

### Pure Functions
Pure functions (or expressions) have no side effects (memory or I/O). This means that pure functions have several useful properties, many of which can be used to optimize the code:

If the result of a pure expression is not used, it can be removed without affecting other expressions.
If a pure function is called with arguments that cause no side-effects, the result is constant with respect to that argument list (sometimes called referential transparency), i.e., calling the pure function again with the same arguments returns the same result. (This can enable caching optimizations such as memoization.)
If there is no data dependency between two pure expressions, their order can be reversed, or they can be performed in parallel and they cannot interfere with one another (in other terms, the evaluation of any pure expression is thread-safe).
If the entire language does not allow side-effects, then any evaluation strategy can be used; this gives the compiler freedom to reorder or combine the evaluation of expressions in a program (for example, using deforestation).

### Recursion
Iteration (looping) in functional languages is usually accomplished via recursion. Recursive functions invoke themselves, letting an operation be repeated until it reaches the base case. Although some recursion requires maintaining a stack, tail recursion can be recognized and optimized by a compiler into the same code used to implement iteration in imperative languages. Tail recursion optimization can be implemented by transforming the program into continuation passing style during compiling, among other approaches.

Common patterns of recursion can be abstracted away using higher-order functions, with catamorphisms and anamorphisms (or "folds" and "unfolds") being the most obvious examples. Such recursion schemes play a role analogous to built-in control structures such as loops in imperative languages.

Most general purpose functional programming languages allow unrestricted recursion and are Turing complete, which makes the halting problem undecidable, can cause unsoundness of equational reasoning, and generally requires the introduction of inconsistency into the logic expressed by the language's type system. 

### Strict vs non-strict evaulation
Functional languages can be categorized by whether they use strict (eager) or non-strict (lazy) evaluation, concepts that refer to how function arguments are processed when an expression is being evaluated.

For example, the expression:
`print length([2+1, 3*2, 1/0, 5-4])`
fails under strict evaluation because of the division by zero in the third element of the list.

Under lazy evaluation, the length function returns the value 4 (i.e., the number of items in the list), since evaluating it does not attempt to evaluate the terms making up the list.

In brief, strict evaluation always fully evaluates function arguments before invoking the function.
Lazy evaluation does not evaluate function arguments unless their values are required to evaluate the function call itself.

Lazy evaluation is used by default in several pure functional languages, including Miranda, Clean, and Haskell.

### Type Systems
Functional programming languages have tended to use typed lambda calculus, rejecting all invalid programs at compilation time and risking false positive errors, as opposed to the untyped lambda calculus, that accepts all valid programs at compilation time and risks false negative errors, used in Lisp and its variants (such as Scheme), though they reject all invalid programs at runtime, when the information is enough to not reject valid programs.

The use of algebraic datatypes makes manipulation of complex data structures convenient; the presence of strong compile-time type checking makes programs more reliable in absence of other reliability techniques like test-driven development, while type inference frees the programmer from the need to manually declare types to the compiler in most cases.

### Referential transparency
Functional programs do not have assignment statements, that is, the value of a variable in a functional program never changes once defined. This eliminates any chances of side effects because any variable can be replaced with its actual value at any point of execution. So, functional programs are referentially transparent.

Consider C assignment statement `x = x * 10`, this changes the value assigned to the variable x. 
Clearly, replacing x = x * 10 with either 10 or 100 gives a program with different meaning, and so the expression is not referentially transparent. In fact, assignment statements are never referentially transparent.

Now, consider another function such as `int plusone(int x) {return x+1;}` is transparent, as it does not implicitly change the input x and thus has no such side effects. Functional programs exclusively use this type of function and are therefore referentially transparent.

### Data structures
Purely functional data structures are often represented in a different way than their imperative counterparts.

For example, the `array` with constant access and update times is a basic component of most imperative languages, and many imperative data-structures, such as the `hash table` and `binary heap`, are based on `arrays`.

`Arrays` can be replaced by `maps` or `random access lists`, which admit purely functional implementation, but have logarithmic access and update times.

Purely functional data structures have `persistence`, a property of keeping previous versions of the data structure unmodified.

In Clojure, persistent data structures are used as functional alternatives to their imperative counterparts. Persistent vectors, for example, use trees for partial updating. Calling the insert method will result in some but not all nodes being created.

### Imperative vs. Functional
The most significant differences stem from the fact that functional programming avoids side effects, which are used in imperative programming to implement state and I/O. Pure functional programming completely prevents side-effects and provides referential transparency.

Higher-order functions are rarely used in older imperative programming. A traditional imperative program might use a loop to traverse and modify a list. A functional program, on the other hand, would probably use a higher-order “map” function that takes a function and a list, generating and returning a new list by applying the function to each list item.

### State
There are tasks (for example, maintaining a bank account balance) that often seem most naturally implemented with state. Pure functional programming performs these tasks, and I/O tasks such as accepting user input and printing to the screen, in a different way.

Functional languages also simulate states by passing around immutable states. This can be done by making a function accept the state as one of its parameters, and return a new state together with the result, leaving the old state unchanged.

### Efficiency
Functional programming languages are typically less efficient in their use of CPU and memory than imperative languages such as C and Pascal.[62] This is related to the fact that some mutable data structures like arrays have a very straightforward implementation using present hardware (which is a highly evolved Turing machine). Flat arrays may be accessed very efficiently with deeply pipelined CPUs, prefetched efficiently through caches (with no complex pointer chasing), or handled with SIMD instructions. It is also not easy to create their equally efficient general-purpose immutable counterparts. For purely functional languages, the worst-case slowdown is logarithmic in the number of memory cells used, because mutable memory can be represented by a purely functional data structure with logarithmic access time (such as a balanced tree)

