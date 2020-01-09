# TemplateRef
https://blog.angularindepth.com/exploring-angular-dom-abstractions-80b3ebcfc02

- Group of DOM elements that are reused in views across the app.
- Before HTML5 standard introduced template tag, most templates arrived to a browser wrapped in a script tag with some variations of type attribute:
- TemplateRef class is a simple class.
- Holds a reference to its host element in **elementRef** property and has one method **createEmbeddedView**.
- **CreateEmbeddedView** method allows creation of a view and return a reference to it as ViewRef.
