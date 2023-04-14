import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-host-binding",
  template: `
    <p>
      host-binding works!
    </p>
    <input type="text" hostBindingEx>
    <form ngForm="myForm">
      <input type="text"
             name="prop"
             required
             [(ngModel)]="prop"
             ngModelEx="prop">
    </form>
  `,
  styles: []
})
export class HostBindingComponent implements OnInit {
  prop;

  constructor() {}

  ngOnInit() {}
}
