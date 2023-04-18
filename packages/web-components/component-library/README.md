# Learn Practical Web Components Quickly

https://learning.oreilly.com/videos/learn-practical-web/9781838649173/

## Custom Elements

Standard HTML elements such as <div>, <p>, <a>, <button>, etc.

Custom elements are elemnts that extend HTML Elements to add behavior.

Class > Content > Export > Use

## Shadow DOM

An encapsulated version of the DOM.

It can have it's own styles and javascript.

```html
<!-- Shadow DOM -->
<div id='shadow-content'></div>
<h1 id='header'>This will NOT have a red background.</h1>
<script>
    const shadowRoot = document.getElementById('shadow-content').attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `
        <style>
            h1 {
                background: red;
                color: #fff;
            }
        </style>
        <h1 id='header'>This will HAVE a red background.</h1>
    `
</script>
```


## HTML Templates

```html
<template id='web-card-template'>
  <style>
      .web-card {
          border: 1px solid #ddd;
          width: 200px;
          padding: 10px;
      }

      .web-card__header {
          padding: 10px;
          border-bottom: 1px solid #ddd;
      }

      .web-card__content {
          margin-top: 10px;
      }
  </style>
  <div class='web-card'>
      <div class='web-card__header'>
          <p class='web-card__title'></p>
          <span class='web-card__subtitle'></span>
      </div>
      <div class='web-card__content'>
          <span class='web-card__synopsis'></span>
      </div>
  </div>
</template>
<web-card />
```

## Lifecycle Methods/Hookds
- constructor
- connectedCallback()
- disconnectedCallback()
- attributeChangeCallback(name, oldValue, newValue)
- adoptedCallback()

### Constructor
- Creating an instance of Shadow DOM
- Setting up event listeners
- Initializing component state

- Not for executing tasks
- Not for rendering
- Not for fetching resources

- Forbidden to use document.write()/document.open()
- Children shold not be referenced because they are not created/rendered yet

### connectedCallback
- Called when an element is added to the DOM
- Set attributes
- Fetch resources
- Run setup code
- Render templates

### disconnectedCallback
- Called when an element is removed from the DOM
- Notify other parts of the application the element is being destroyed
- Unsubscribe from DOM events
- Stop interval timers
- Unregister all registered callbacks

### attributeChangeCallback
- Called with attributes are:
  - added
  - removed
  - updated
  - replaced
- Attributes are stored in the method `static get observedAttributes`

### adoptedCallback
- Called when element is adopted into a new document
- An element can be adopted by calling `document.adoptNode(element)`
- It can help interact with owner document, main document, or other elements
- Element is not destroyed and created again wile adopting, so the constructor will not be called

## Styling

### Ways to Add Global Styling to Shadow DOM
- Using @import
- Using a web component library like Polymer or SkateJS
- Custom properties
- Links in the shadow DOM e.g. `<link rel="stylesheet" href="/assets/some-file.css" />` placed within the `<template>` tag.


## Event Listener
e.g. mouse clicks

- Event listeners can be added by selecting the element and then using addEventListener(<name>, function) to it
- The <name> can then be called using methods like `onclick` `onhover` etc

### Dispatching Custom Events
- Create a custom event using `new CustomEvent(<name>, object)`
- Event listeners can be added by selecting the element and then using addEventListener(<name>, function) to it
- Custom events can be dispatched via `dispatchEvent(customEvent)`

## Animation

### CSS
```css
.loader {
  border: 16px solid #F3F3F3;
  border-top: 16px solid #3498DB;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animate: spin 2s linear infinte;
}

@keyframes spin {
  0% { transform: rotate(0deg) };
  100% { transform: rotate(100deg) };
}
```

### Animate the element using JS in the following steps:
- Create a variable (array of objects) storing various phases of the animation
- Create another variable storing the timing and duration of the phases
- Start the animation by accessing the element and calling the above two variables with animate()


