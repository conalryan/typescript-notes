# Scratch Notes

- Clicking a button that does nothing, will cause the DOM to rerender.
- Proof of this is to have a function debug() in between interpolation brackets.
- It will be called for every prop in DOM even though the button click has no interaction with the model.
