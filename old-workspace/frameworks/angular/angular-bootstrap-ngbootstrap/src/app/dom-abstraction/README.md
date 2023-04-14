# DOM Abstraction

Manipulating Views
https://blog.angularindepth.com/exploring-angular-dom-abstractions-80b3ebcfc02

# AngularJS
- Manipulate the DOM required injecting DOM element into link function and you could query any node within component’s template, add or remove child nodes, modify styles etc.
- However, this approach had one major shortcoming — it was tightly bound to a browser platform.

# Angular
- Runs on different platforms:
  - Browser
  - Mobile platform 
  - Inside a web worker. 
- Level of abstraction is required to stand between platform specific API and the framework interfaces. 
  - Abstractions come in a form of the following reference types: 
    - ElementRef
    - TemplateRef
    - ViewRef
    - ComponentRef
    - ViewContainerRef
