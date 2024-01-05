/** https://www.typescriptlang.org/play?ts=5.3.2#code/MYewdgzgLgBAhgLhmArgWwEYFMBOBtAXRgF4Y8BGAGhgCZqBmagFmoFYCBuAKAHoeYADiAHwwAE0EoIACy5wAdEIEAKAJTcFAqdOUBOXeq6hIIADZZ5pkAHNlAcjh3qcdTD5kAMgHkA4gSQARHAB1GRUtAzM1PoEXLz8oGgCcDhYcvIAlmDApihiWBDK9IbxMPkAjihYohJYYJVYVekyGQBmUGoa8iiQ0m0dABwDhsYQZhZWtg5O8K7ueN5+gcGheEPUdDCMMCwwMXHmsBgkyFgA7jAAgjg4cACeADyomLgAfEWq8q0ZpqbKAAwjcBjcyWGz2DAzDBzfgLXz+GABDAhGBkf7UdEwf6xUpoOACLjHUgYeR4lQZKBYNAkV4wClUmAAahg5CBJlBkwhUJhnnhgWRq3CQpx7m+pkpOEJeGxJxo3EOMGAqOJXx+EuU9OpxFpmpgtNZ3FG4zBU2AM2APLhS0RwBRZBoIv433EUodJyYTG4JOdYg1lK1Ov9JGIpA9bJBE3Bdkh1GhHDcsMWCKRdrwm3CHoIQA */

const a: number[] = [1, 2, 3, 4, 5];
console.log(a[3]); // 4

a[4] = 6;
console.log(a[4]); // 6

// -----------------------------------------------------------
// JavaScript does not have a primitive array
// Below are methods associated with an ArrayList not an array
// however, they are avaiable in JavaScript

// pop and push
a.pop();
a.push(99);
console.log('a', a); // [LOG]: "a",  [1, 2, 3, 4, 99]

// compare
a.includes(3);

// deque and enqueue
a.shift();
a.unshift(88);
console.log('a', a); // [LOG]: "a",  [88, 2, 3, 4, 99]

let b = new Array<number>(3).fill(0);
console.log('b', b); // [LOG]: "b",  [0, 0, 0]

// map
b = b.map(item => item + 1);
console.log('b', b); // [LOG]: "b",  [1, 1, 1]

// filter
b[0] = 2;
let c  = b.filter(item => item > 1);
console.log('c', c); // [LOG]: "c",  [2]

// find
b[2] = 44;
b.find(item => item === 44);
console.log('b', b); // [LOG]: "b",  [2, 1, 44]
