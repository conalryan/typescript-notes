# ElementRef
- Most basic abstraction.
- Class structure only holds the native element it’s associated with.
- Useful for accessing native DOM element.
- Discouraged by Angular team due to tight coupling of rendering layers and security risk.
- ElementRef can be returned for any DOM element using ViewChild decorator.
- Alternative is to use Host Element through DI.
- ViewChild decorator is used most often to get a reference to a DOM element in their view (template).
 - Vice verse with directives — they have no views and they usually work directly with the element they are attached to.
