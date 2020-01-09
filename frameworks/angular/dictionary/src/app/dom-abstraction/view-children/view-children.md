# ViewChildren
https://netbasal.com/understanding-viewchildren-contentchildren-and-querylist-in-angular-896b0c689f6e

- Parent wants to access it's children.
- Returns specified elements or directives from the DOM as a QueryList.
- The read parameter:
  - ViewChildren decorator will return the component instance by default.
  - ElementRef: Native DOM element.
    ````typescript
    @ViewChildren(AlertComponent, { read: ElementRef }) alerts: QueryList<AlertComponent>
    ````
  - ViewContainerRef: Needed to create templates or components dynamically.
    ````typescript
    @ViewChildren(AlertComponent, { read: ViewContainerRef }) alerts: QueryList<AlertComponent>
    ````
- QueryList is initialized only before the ngAfterViewInit lifecycle hook, therefore, is available only from this point.
- QueryList<> is undefined until AfterViewInit lifecycle hook
- ViewChildren does not include elements that exist within the ng-content tag.
- ContentChildren includes only elements that exists within the ng-content tag

