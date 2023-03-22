function RespondingToEvents() {
  function handleClick() {
    alert('You clicked me!');
  }

  return (
    /**
     * Do not call the event handler (e.g. handleClick()))
     * React will call your event handler when the user clicks the button.
     */
    <button onClick={handleClick}>
      Click me
    </button>
  );
}

export default RespondingToEvents;