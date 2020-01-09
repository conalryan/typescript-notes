# Change Detection
https://blog.angularindepth.com/everything-you-need-to-know-about-change-detection-in-angular-8006c51d206f

constructor

ngOnChanges
ngOnInit
ngDoCheck
  - ngAfterContentInit
  - ngAfterContentChecked
  - ngAfterViewInit
  - ngAfterViewChecked
ngOnDestroy

# View as a core concept
- Angular application is a tree of components.
- However, under the hood angular uses a low-level abstraction called view.
- One view is associated with one component and vice verse.
- View holds a reference to the associated component class instance in the component property. 
- All operations like property checks and DOM updates are performed on views.
- Technically correct to state that angular is a tree of views.
- Component is a higher level concept of a view.

# View Definition
- Fundamental building block of the application UI. 
- It is the smallest grouping of Elements which are created and destroyed together.
- Properties of elements in a View can change.
- Structure (number and order) of elements in a View cannot change.
- Changing the structure of Elements can only be done by inserting, moving or removing nested Views via a ViewContainerRef.
- Each View can contain many View Containers.

In reality, there’s no separate object (ChangeDetectorRef) for change detection and View is what change detection runs on.

Each view has a link to its child views through nodes property and hence can perform actions on child views.

# View state
- Each view has a state.
- Decides whether to run change detection for the view and all its children or skip it. There are many possible states:
  - FirstCheck
  - ChecksEnabled
  - Errored
  - Destroyed
- Change detection is skipped for the view and its child views if ChecksEnabled is false or view is in the Errored or Destroyed state.
- By default, all views are initialized with ChecksEnabled unless ChangeDetectionStrategy.OnPush is used. 
- The states can be combined, for example, a view can have both FirstCheck and ChecksEnabled flags set.
