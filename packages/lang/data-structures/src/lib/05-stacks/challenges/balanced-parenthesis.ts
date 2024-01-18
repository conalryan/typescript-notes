import { Stack } from '../stack';

/**
 * Given a string of opening and closing parenthesis,
 * determine if the open and closing pairs match.
 *
 * true cases:
 * "()"
 * "(())"
 * "((()))"
 *
 * false cases:
 * "("
 * ")"
 * ")("
 * "(()"
 * "())"
 */
export const isBalanced = (str: string): boolean => {
  const stack = new Stack();

  for (let i = 0; i < str.length; i++) {
    const letter = str.charAt(i)
    // if the letter is an opening paren push it on the stack
    if (letter === '(') {
      stack.push(letter)
    } else if (letter === ')') {
      // if the letter is a closing paren make sure it has a matching opening paren
      if (stack.length === 0) {
        return false // the closing paren had no matching opening paren
      } else if (stack.peek() === '(') {
        stack.pop()
      } else {
        return false;
      }
    }
  }

  return stack.length === 0;
}
