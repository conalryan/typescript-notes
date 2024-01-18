import { Stack } from '../stack';

export const reverse = (str: string): string => {
  const stack = new Stack<string>();

  for (let i = 0; i < str.length; i++) {
    stack.push(str.charAt(i));
  }

  let reversed = '';
  let ltr = stack.pop();
  while (ltr) {
    reversed  += ltr;
    ltr = stack.pop();
  }

  return reversed;
};
