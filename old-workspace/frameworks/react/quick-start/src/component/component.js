/**
 * React components are JavaScript functions that return markup:
 * React component names must always start with a capital letter, while HTML tags must be lowercase.
 */
export function MyButton() {
  return (
    <button>I'm a button</button>
  );
}

export function Component () {
  const msg = 'Hello from Component';

  return (
    <div className="compoent">
      <h3>Component</h3>
      <div>
        { msg }
      </div>
    </div>
  );
}
