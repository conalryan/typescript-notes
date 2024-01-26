import { Queue } from '../queue';

/**
 *
 * Write a function that accepts an array of choices
 * and an integer n. You should cycle through the choices
 * starting at the beginning and counting up to N. Every
 * time N is reached one choice should be removed. Continue
 * this process counting to N and removing the choice at that
 * count until only one choice is left. Return that choice.
 * [A, B, C, D, E, F] n=3 returns B
 * [A, B, C, D, E, F] n=4 returns F
 */
export const josephus = (choices: string[], n: number): string | undefined=> {
  const q = new Queue<string>();

  // add each choice to the queue
  for (const choice of choices) {
    q.enqueue(choice);
  }

  // account for starting the 1 count at the second item
  // i.e. pull A from the head of the line and move it to the back of the line
  // head is now B and tail is now A
  q.enqueue(q.deque() as string);

  let count = 1;
  while (q.length > 1) {
    const choice = q.deque();
    if (count % n !== 0) { // (1) 'A' the tail 3 % 3, (2) 'B' the head 6 % 3
      q.enqueue(choice as string);
    }
    count++;
  }

  return q.deque();
};
