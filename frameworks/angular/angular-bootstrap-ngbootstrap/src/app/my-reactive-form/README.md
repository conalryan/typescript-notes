  # Reactive Forms
https://angular.io/guide/reactive-forms

Angular reactive forms facilitate a reactive style of programming that favors explicit management of the data flowing between a non-UI data model (typically retrieved from a server) and a UI-oriented form model that retains the states and values of the HTML controls on screen. Reactive forms offer the ease of using reactive patterns, testing, and validation.

With reactive forms, you create a tree of Angular form control objects in the component class and bind them to native form control elements in the component template, using techniques described in this guide.

You create and manipulate form control objects directly in the component class. As the component class has immediate access to both the data model and the form control structure, you can push data model values into the form controls and pull user-changed values back out. The component can observe changes in form control state and react to those changes.

One advantage of working with form control objects directly is that value and validity updates are always synchronous and under your control. You won't encounter the timing issues that sometimes plague a template-driven form and reactive forms can be easier to unit test.

In keeping with the reactive paradigm, the component preserves the immutability of the data model, treating it as a pure source of original values. Rather than update the data model directly, the component extracts user changes and forwards them to an external component or service, which does something with them (such as saving them) and returns a new data model to the component that reflects the updated model state.

Using reactive form directives does not require you to follow all reactive priniciples, but it does facilitate the reactive programming approach should you choose to use it.

## Async vs. sync   
Reactive forms are synchronous. Template-driven forms are asynchronous. It's a difference that matters.

In reactive forms, you create the entire form control tree in code. You can immediately update a value or drill down through the descendents of the parent form because all controls are always available.

Template-driven forms delegate creation of their form controls to directives. To avoid "changed after checked" errors, these directives take more than one cycle to build the entire control tree. That means you must wait a tick before manipulating any of the controls from within the component class.

For example, if you inject the form control with a @ViewChild(NgForm) query and examine it in the ngAfterViewInit lifecycle hook, you'll discover that it has no children. You must wait a tick, using setTimeout, before you can extract a value from a control, test its validity, or set it to a new value.

The asynchrony of template-driven forms also complicates unit testing. You must wrap your test block in async() or fakeAsync() to avoid looking for values in the form that aren't there yet. With reactive forms, everything is available when you expect it to be.

## Essential form classes
It may be helpful to read a brief description of the core form classes.

- AbstractControl is the abstract base class for the three concrete form control classes: FormControl, FormGroup, and FormArray. It provides their common behaviors and properties, some of which are observable.
- FormControl tracks the value and validity status of an individual form control. It corresponds to an HTML form control such as an input box or selector.
- FormGroup tracks the value and validity state of a group of AbstractControl instances. The group's properties include its child controls. The top-level form in your component is a FormGroup.
- FormArray tracks the value and validity state of a numerically indexed array of AbstractControl instances.
You'll learn more about these classes as you work through this guide.

## Add a FormGroup   
Usually, if you have multiple FormControls, you'll want to register them within a parent FormGroup. This is simple to do. To add a FormGroup, add it to the imports section of hero-detail.component.ts:

src/app/hero-detail/hero-detail.component.ts
```typescript
import { Component }              from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

```
In the class, wrap the FormControl in a FormGroup called heroForm as follows:

src/app/hero-detail/hero-detail.component.ts
````typescript
export class HeroDetailComponent2 {
 heroForm = new FormGroup ({
   name: new FormControl()
 });
}
````

````html
<h2>Hero Detail</h2>
<h3><i>FormControl in a FormGroup</i></h3>
<form [formGroup]="heroForm" novalidate>
  <div class="form-group">
    <label class="center-block">Name:
      <input class="form-control" formControlName="name">
    </label>
  </div>
</form>
````
formGroup is a reactive form directive that takes an existing FormGroup instance and associates it with an HTML element. In this case, it associates the FormGroup you saved as heroForm with the form element.

Because the class now has a FormGroup, you must update the template syntax for associating the input with the corresponding FormControl in the component class. Without a parent FormGroup, [formControl]="name" worked earlier because that directive can stand alone, that is, it works without being in a FormGroup. With a parent FormGroup, the name input needs the syntax formControlName=name in order to be associated with the correct FormControl in the class. This syntax tells Angular to look for the parent FormGroup, in this case heroForm, and then inside that group to look for a FormControl called name.

## Introduction to FormBuilder
The FormBuilder class helps reduce repetition and clutter by handling details of control creation for you.
- Explicitly declare the type of the heroForm property to be FormGroup; you'll initialize it later.
- Inject a FormBuilder into the constructor.
- Add a new method that uses the FormBuilder to define the heroForm; call it createForm.
- Call createForm in the constructor.

## Nested FormGroups
You can group some of the related FormControls into a nested FormGroup. Nesting groups and controls in this way allows you to mirror the hierarchical structure of the data model and helps track validation and state for related sets of controls.

## Inspect FormControl Properties
Sometimes you're interested only in the state of one particular FormControl.

You can inspect an individual FormControl within a form by extracting it with the .get() method. You can do this within the component class or display it on the page by adding the following to the template, immediately after the {{form.value | json}} interpolation as follows:

src/app/hero-detail/hero-detail.component.html
````html
<p>Name value: {{ heroForm.get('name').value }}</p>
````

To get the state of a FormControl that’s inside a FormGroup, use dot notation to path to the control.

src/app/hero-detail/hero-detail.component.html
````html
<p>Street value: {{ heroForm.get('address.street').value}}</p>
````

You can use this technique to display any property of a FormControl such as one of the following:

Property	Description
myControl.value - the value of a FormControl.
myControl.status - the validity of a FormControl. Possible values: VALID, INVALID, PENDING, or DISABLED.
myControl.pristine - true if the user has not changed the value in the UI. Its opposite is myControl.dirty.
myControl.untouched	- true if the control user has not yet entered the HTML control and triggered its blur event. Its opposite is myControl.touched.

## The data model and the form model
At the moment, the form is displaying empty values. The HeroDetailComponent should display values of a hero, possibly a hero retrieved from a remote server.

In this app, the HeroDetailComponent gets its hero from a parent HeroListComponent

The hero from the server is the data model. The FormControl structure is the form model.

The component must copy the hero values in the data model into the form model. There are two important implications:
1. The developer must understand how the properties of the data model map to the properties of the form model.
2. User changes flow from the DOM elements to the form model, not to the data model. The form controls never update the data model.

The form and data model structures need not match exactly. You often present a subset of the data model on a particular screen. But it makes things easier if the shape of the form model is close to the shape of the data model.

Nonetheless, the two models are pretty close in shape and you'll see in a moment how this alignment facilitates copying the data model properties to the form model with the patchValue and setValue methods.
The form model doesn't have to match the data model.
 
## Populate the form model with setValue and patchValue   
Previously you created a control and initialized its value at the same time. You can also initialize or reset the values later with the setValue and patchValue methods.

### setValue
With setValue, you assign every form control value at once by passing in a data object whose properties exactly match the form model behind the FormGroup.

src/app/hero-detail/hero-detail.component.ts (excerpt)
````typescript
this.heroForm.setValue({
 name:    this.hero.name,
 address: this.hero.addresses[0] || new Address()
});
````

The setValue method checks the data object thoroughly before assigning any form control values.

It will not accept a data object that doesn't match the FormGroup structure or is missing values for any control in the group. This way, it can return helpful error messages if you have a typo or if you've nested controls incorrectly. patchValue will fail silently.

On the other hand,setValue will catch the error and report it clearly.

### patchValue    
With patchValue, you can assign values to specific controls in a FormGroup by supplying an object of key/value pairs for just the controls of interest.

This example sets only the form's name control.

src/app/hero-detail/hero-detail.component.ts (excerpt)
````typescript
this.heroForm.patchValue({
  name: this.hero.name
});
````
With patchValue you have more flexibility to cope with wildly divergent data and form models. But unlike setValue, patchValue cannot check for missing control values and does not throw helpful errors.

### When to set form model values (ngOnChanges)   
Now you know how to set the form model values. But when do you set them? The answer depends upon when the component gets the data model values.

In this approach, the value of hero in the HeroDetailComponent changes every time the user selects a new hero. You should call setValue in the ngOnChanges hook, which Angular calls whenever the input hero property changes as the following steps demonstrate.
````typescript
ngOnChanges()
  this.heroForm.setValue({
    name:    this.hero.name,
    address: this.hero.addresses[0] || new Address()
  });
}
````

### reset the form flags
You should reset the form when the hero changes so that control values from the previous hero are cleared and status flags are restored to the pristine state. You could call reset at the top of ngOnChanges like this.
````typescript
this.heroForm.reset();
````

The reset method has an optional state value so you can reset the flags and the control values at the same time. Internally, reset passes the argument to setValue. A little refactoring and ngOnChanges becomes this:

src/app/hero-detail/hero-detail.component.ts (ngOnchanges - revised)
````typescript
ngOnChanges() {
  this.heroForm.reset({
    name: this.hero.name,
    address: this.hero.addresses[0] || new Address()
  });
}
````

### Use FormArray to present an array of FormGroups
So far, you've seen FormControls and FormGroups. A FormGroup is a named object whose property values are FormControls and other FormGroups.

Sometimes you need to present an arbitrary number of controls or groups. For example, a hero may have zero, one, or any number of addresses.

To work with a FormArray you do the following:
1. Define the items (FormControls or FormGroups) in the array.
2. Initialize the array with items created from data in the data model.
3. Add and remove items as the user requires.

### Initialize the FormArray
You need a method to populate (or repopulate) the array when the input property changes.
````typescript
setAddresses(addresses: Address[]) {
  const addressFGs = addresses.map(address => this.fb.group(address));
  const addressFormArray = this.fb.array(addressFGs);
  this.heroForm.setControl('secretLairs', addressFormArray);
}
````
Notice that you replace the previous FormArray with the FormGroup.setControl method, not with setValue. You're replacing a control, not the value of a control.

Notice also that the secretLairs FormArray contains FormGroups, not Addresses.

### Display the FormArray
The trick lies in knowing how to write the *ngFor. There are three key points:
1. Add another wrapping <div>, around the <div> with *ngFor, and set its formArrayName directive to "secretLairs". This step establishes the secretLairs FormArray as the context for form controls in the inner, repeated HTML template.
2. The source of the repeated items is the FormArray.controls, not the FormArray itself. Each control is an address FormGroup, exactly what the previous (now repeated) template HTML expected.
3. Each repeated FormGroup needs a unique formGroupName which must be the index of the FormGroup in the FormArray. You'll re-use that index to compose a unique label for each address.

FormArray of FormGroups
````html
<div formArrayName="myFormArray">
  <div *ngFor="let myForm of myFormArray.controls; let i=index" [formGroupName]="i" >
    <div class="form-group">
      <label class="control-label">My Label</label>
      <input class="form-control" formControlName="myFormControlName">
    </div>
  </div>
</div>
````

FormArray of FormControls
````html
<div formArrayName="myFormArray">
  <!-- The source of the repeated items is the FormArray.controls, not the FormArray itself. -->
  <div *ngFor="let myFormControl of myFormArray.controls">
    <div class="form-group">
      <label class="control-label">My Label</label>
      <input class="form-control" [formControl]="myFormControl">
    </div>
  </div>
</div>
````

### Add an item to the FormArray
````typescript
addItem() {
  // FormGroup
  this.myFormArray.push(this.fb.group(new Item()));
  // FormControl
  this.myFormArray.push(this.fb.control('some item'));
}
````

### Observe control changes  
Angular calls ngOnChanges when the user picks a hero in the parent HeroListComponent. Picking a hero changes the HeroDetailComponent.hero input property.

Angular does not call ngOnChanges when the user modifies the hero's name or secret lairs. Fortunately, you can learn about such changes by subscribing to one of the form control properties that raises a change event.

These are properties, such as valueChanges, that return an RxJS Observable. You don't need to know much about RxJS Observable to monitor form control values.

````typescript
nameChangeLog: string[] = [];
logNameChange() {
  const nameControl = this.heroForm.get('name');
  nameControl.valueChanges.forEach(
    (value: string) => this.nameChangeLog.push(value)
  );
}

constructor(private fb: FormBuilder) {
  this.createForm();
  this.logNameChange();
}
````
When to use it:
An interpolation binding is the easier way to display a name change. Subscribing to an observable form control property is handy for triggering application logic within the component class.

### Save
In this sample application, when the user submits the form, the HeroDetailComponent will pass an instance of the hero data model to a save method on the injected HeroService.
    
````typescript
onSubmit() {
  this.hero = this.prepareSaveHero();
  this.heroService.updateHero(this.hero).subscribe(/* error handling */);
  this.ngOnChanges();
}

prepareSaveHero(): Hero {
  const formModel = this.heroForm.value;

  // deep copy of form model lairs
  const secretLairsDeepCopy: Address[] = formModel.secretLairs.map(
    (address: Address) => Object.assign({}, address)
  );

  // return new `Hero` object containing a combination of original hero value(s)
  // and deep copies of changed form model values
  const saveHero: Hero = {
    id: this.hero.id,
    name: formModel.name as string,
    // addresses: formModel.secretLairs // <-- bad!
    addresses: secretLairsDeepCopy
  };
  return saveHero;
}
````
