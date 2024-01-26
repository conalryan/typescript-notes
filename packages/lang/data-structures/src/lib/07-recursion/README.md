# Recursion

Something that keeps calling itself.

The simplest way to think of recursion is a function that calls itself until the problem is solved. This usually involves what is referred to as a "_base case_." A base case is the point at which the problem is solved.

### Function stack
- Return Address (RA): Every function call needs to know how it got there. This is the return address.
- Return Value (RV): It also needs to know the return value.
- ARG: Last we have the arguments.

### Recursion steps
2 steps:
1. base case
2. Recurse
	1. pre
	2. recurse
	3. post

The 3 steps in recurse is very important in pathing. It's hard to do tree and graph without recursion.

```typescript
function foo(n: number): number {
	// Base Case
	if (n === 1) { return 1; }
	// We shall Recurse!
	return n + foo(n - 1);
}
```

### The biggest mistake of recursion
Not put it into the 2 steps. You must know your base case.
1. Base Case
2. Recurse

### When do I use recursion
- Its not able to be done via for loop
- There is a branching factor (e.g. checking in 4 directions)
- There is no concrete termination (e.g. a given length)

When ever you traverse 2D arrays you go down columns, then across rows, it's backwards.

Put as much as you can into the base case. It reduces the complexity. Instead of making checks, put it into the base case.

When you're given a function to solve, put the recursive function in a separate function to recurse.
