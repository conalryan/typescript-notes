// Write a function called isPalindrome that
// accepts a string and returns true or false
// if the string is a palindrome or not.
// A palindrome is any string that is spelled
// the same backwards and forwards.
// isPalindrome("") => true
// isPalindrome("a") => true
// isPalindrome("tt") => true
// isPalindrome("tot") => true
// isPalindrome("tacocat") => true
// isPalindrome("boring") => false
// 
// You must have a base case and a recursive
// case. Remember, the base case is usually
// very simple. How do you know when the 
// function should not recurse? In this
// case it should not recurse when you know
// you have an answer one way or the other.
//
// In your recursive case consider how to make
// progress toward the solution. In the iterate
// through an array recursive example we did
// earlier we incremented an index. How can
// we make progress in this problem?
//
// function isPalindrome(str, start=0, end=null)
//   base case: any string less than 2 chars
//              returns true
//   base case: if the first and last letters
//              do not match return false
//   base case: if the end index appears before
//              the start index return true
//              you've looked at everything
//   recursive case:
//     keep track of a start index
//     and an end index
//     increment the start index
//     decrement the end index so the function
//     recursively examines the next step
//     inward of the string.
function isPalindrome(str, start=0, end=null) {
    // if no end is provided (first function call)
    // then set it to the index of the last letter
    if (end === null) end = str.length - 1
    if (str.length < 2) {
        return true
    } else if (end <= start) {
        return true
    } else if (str.charAt(start) !== str.charAt(end)) {
        return false
    } else {
        return isPalindrome(str, start + 1, end - 1)
    }
}

console.log(isPalindrome(""), true)
console.log(isPalindrome("a"), true)
console.log(isPalindrome("tt"), true)
console.log(isPalindrome("tot"), true)
console.log(isPalindrome("tacocat"), true)
console.log(isPalindrome("boring"), false)
console.log(isPalindrome("abc-xbbby-cba"), false)