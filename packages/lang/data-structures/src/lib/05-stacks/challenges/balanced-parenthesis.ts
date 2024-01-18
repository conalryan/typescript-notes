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
  const OPEN = '(';
  const CLOSE = ')';

  for (let i = 0; i < str.length; i++) {
    const c = str.charAt(i);
    const p = stack.peek();
    if (c === OPEN) {
      if (!p || p === c) {
        // first element or opening bracking
        stack.push(c);
      } else {
        // previous value was a closing bracke )(
        return false;
      }
    } else {
      if (!p) {
        // no previous opening bracket
        return false;
      }
      if (p === c) {
        // previous value was a closing bracket ))
        return false;
      } else {
        // found a match ()
        stack.pop();
      }
    }
  }

  return stack.length === 0;
}
