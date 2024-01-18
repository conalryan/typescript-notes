import { Stack } from '../stack';

/**
 * true cases:
 * ()
 * foo(aa[i], {bar: [0,12]})
 * console.log()
 *
 * false cases:
 * (
 * )
 * )(
 * (()
 * ())
 * foo(3 * ((1 + 4) / 2)
 */
export const isBalanced = (str: string): boolean => {
  const OPENING = "({["
  const CLOSING = ")}]"

  const stack = new Stack<string>();

  // iterate through every letter of the string
  for (let i = 0; i < str.length; i++) {
    const letter = str.charAt(i)
    if (OPENING.includes(letter)) {
      // push all openings
      stack.push(letter)
    } else if (CLOSING.includes(letter)) {
      // each closing character must have a matching opening character
      if (stack.length === 0) {
        return false
      } else {
        const top = stack.peek();
        if (OPENING.indexOf(top!) === CLOSING.indexOf(letter)) {
          stack.pop()
        } else {
          return false
        }
      }
    }
  }
  return stack.length === 0
}

console.log('true cases:')
console.log(isBalanced("()"))
console.log(isBalanced("foo(aa[i], {bar: [0,12]})"))
console.log()

console.log('false cases:')
console.log(isBalanced("("))
console.log(isBalanced(")"))
console.log(isBalanced(")("))
console.log(isBalanced("(()"))
console.log(isBalanced("())"))
console.log(isBalanced("foo(3 * ((1 + 4) / 2)"))
