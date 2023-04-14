# Forms
https://angular.io/guide/forms

# Binding to user input events

You can use Angular event bindings to respond to any DOM event. Many DOM events are triggered by user input. Binding to these events provides a way to get input from the user.

To bind to a DOM event, surround the DOM event name in parentheses and assign a quoted template statement to it.

The following example shows an event binding that implements a click handler:

src/app/click-me.component.ts
````html
<button (click)="onClickMe()">Click me!</button>
````

When writing a binding, be aware of a template statement's execution context. The identifiers in a template statement belong to a specific context object, usually the Angular component controlling the template.

## Get user input from the $event object

DOM events carry a payload of information that may be useful to the component. This section shows how to bind to the keyup event of an input box to get the user's input after each keystroke.

The following code listens to the keyup event and passes the entire event payload ($event) to the component event handler.

src/app/keyup.components.ts (template v.1)
````html
<input (keyup)="onKey($event)">
<p>{{values}}</p>
````

All standard DOM event objects have a target property, a reference to the element that raised the event. In this case, target refers to the <input> element and event.target.value returns the current contents of that element.

## Type the $event
  
The example above casts the $event as an any type. That simplifies the code at a cost. There is no type information that could reveal properties of the event object and prevent silly mistakes.

The following example rewrites the method with types:

src/app/keyup.components.ts (class v.1 - typed )
````typescript
export class KeyUpComponent_v1 {
  values = '';


  onKey(event: KeyboardEvent) { // with type info
    this.values += (<HTMLInputElement>event.target).value + ' | ';
  }
}
`````

## Passing $event is a dubious practice
Typing the event object reveals a significant objection to passing the entire DOM event into the method: the component has too much awareness of the template details. It can't extract information without knowing more than it should about the HTML implementation. That breaks the separation of concerns between the template (what the user sees) and the component (how the application processes user data).

The next section shows how to use template reference variables to address this problem.

Get user input from a template reference variable

There's another way to get the user data: use Angular template reference variables. These variables provide direct access to an element from within the template. To declare a template reference variable, precede an identifier with a hash (or pound) character (#).

The following example uses a template reference variable to implement a keystroke loopback in a simple template.

src/app/loop-back.component.ts
````typescript
@Component({
  selector: 'app-loop-back',
  template: `
    <input #box (keyup)="0">
    <p>{{box.value}}</p>
  `
})
export class LoopbackComponent { }
````
This won't work at all unless you bind to an event.

Angular updates the bindings (and therefore the screen) only if the app does something in response to asynchronous events, such as keystrokes. This example code binds the keyup event to the number 0, the shortest template statement possible. While the statement does nothing useful, it satisfies Angular's requirement so that Angular will update the screen.

It's easier to get to the input box with the template reference variable than to go through the $event object. Here's a rewrite of the previous keyup example that uses a template reference variable to get the user's input.

src/app/keyup.components.ts (v2)
````typescript
@Component({
  selector: 'app-key-up2',
  template: `
    <input #box (keyup)="onKey(box.value)">
    <p>{{values}}</p>
  `
})
export class KeyUpComponent_v2 {
  values = '';
  onKey(value: string) {
    this.values += value + ' | ';
  }
}
````

## A nice aspect of this approach is that the component gets clean data values from the view. It no longer requires knowledge of the $event and its structure.

Key event filtering (with key.enter)

The (keyup) event handler hears every keystroke. Sometimes only the Enter key matters, because it signals that the user has finished typing. One way to reduce the noise would be to examine every $event.keyCode and take action only when the key is Enter.

There's an easier way: bind to Angular's keyup.enter pseudo-event. Then Angular calls the event handler only when the user presses Enter.

src/app/keyup.components.ts (v3)
````typescript
@Component({
  selector: 'app-key-up3',
  template: `
    <input #box (keyup.enter)="onEnter(box.value)">
    <p>{{value}}</p>
  `
})
export class KeyUpComponent_v3 {
  value = '';
  onEnter(value: string) { this.value = value; }
}
````

## On blur
  
In the previous example, the current state of the input box is lost if the user mouses away and clicks elsewhere on the page without first pressing Enter. The component's value property is updated only when the user presses Enter.

To fix this issue, listen to both the Enter key and the blur event.

src/app/keyup.components.ts (v4)
````typescript
@Component({
  selector: 'app-key-up4',
  template: `
    <input #box
      (keyup.enter)="update(box.value)"
      (blur)="update(box.value)">

    <p>{{value}}</p>
  `
})
export class KeyUpComponent_v4 {
  value = '';
  update(value: string) { this.value = value; }
}
````

## Observations
- Use template variables to refer to elements — The newHero template variable refers to the <input> element. You can reference newHero from any sibling or child of the <input> element.
- Pass values, not elements — Instead of passing the newHero into the component's addHero method, get the input box value and pass that to addHero.
- Keep template statements simple — The (blur) event is bound to two JavaScript statements. The first statement calls addHero. The second statement, newHero.value='', clears the input box after a new hero is added to the list.

These techniques are useful for small-scale demonstrations, but they quickly become verbose and clumsy when handling large amounts of user input. Two-way data binding is a more elegant and compact way to move values between data entry fields and model properties. The next page, Forms, explains how to write two-way bindings with NgModel.

# Forms

## Template-driven forms
You can build forms by writing templates in the Angular template syntax with the form-specific directives and techniques described in this page.

In template driven forms, if you've imported FormsModule, you don't have to do anything to the <form> tag in order to make use of FormsModule. Continue on to see how this works.

## The NgForm directive
What NgForm directive? You didn't add an NgForm directive.

Angular did. Angular automatically creates and attaches an NgForm directive to the <form> tag.

The NgForm directive supplements the form element with additional features. It holds the controls you created for the elements with an ngModel directive and name attribute, and monitors their properties, including their validity. It also has its own valid property which is true only if every contained control is valid.

Defining a name attribute is a requirement when using [(ngModel)] in combination with a form.

Internally, Angular creates FormControl instances and registers them with an NgForm directive that Angular attached to the <form> tag. Each FormControl is registered under the name you assigned to the name attribute. Read more in the previous section, The NgForm directive.

Each input element has an id property that is used by the label element's for attribute to match the label to its input control.
Each input element has a name property that is required by Angular forms to register the control with the form.

## Track control state and validity with ngModel   
Using ngModel in a form gives you more than just two-way data binding. It also tells you if the user touched the control, if the value changed, or if the value became invalid.

The NgModel directive doesn't just track state; it updates the control with special Angular CSS classes that reflect the state. You can leverage those class names to change the appearance of the control.

State	Class if true	Class if false
The control has been visited.	ng-touched	ng-untouched
The control's value has changed.	ng-dirty	ng-pristine
The control's value is valid.	ng-valid	ng-invalid

## Show and hide validation error messages
You need a template reference variable to access the input box's Angular control from within the template. Here you created a variable called name and gave it the value "ngModel".

Why "ngModel"? A directive's exportAs property tells Angular how to link the reference variable to the directive. You set name to ngModel because the ngModel directive's exportAs property happens to be "ngModel".

## Submit the form with ngSubmit 
The user should be able to submit this form after filling it in. The Submit button at the bottom of the form does nothing on its own, but it will trigger a form submit because of its type (type="submit").

A "form submit" is useless at the moment. To make it useful, bind the form's ngSubmit event property to the hero form component's onSubmit() method:

src/app/hero-form/hero-form.component.html (ngSubmit)
````typescript
<form (ngSubmit)="onSubmit()" #heroForm="ngForm">
````

## Summary\
The Angular form discussed in this page takes advantage of the following framework features to provide support for data modification, validation, and more:
- An Angular HTML form template.
- A form component class with a @Component decorator.
- Handling form submission by binding to the NgForm.ngSubmit event property.
- Template-reference variables such as #heroForm and #name.
- [(ngModel)] syntax for two-way data binding.
- The use of name attributes for validation and form-element change tracking.
- The reference variable’s valid property on input controls to check if a control is valid and show/hide error messages.
- Controlling the Submit button's enabled state by binding to NgForm validity.
- Custom CSS classes that provide visual feedback to users about invalid controls.

Template-drive forns have less code in the component class, template-driven forms are asynchronous which may complicate development in more advanced scenarios.
