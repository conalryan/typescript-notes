import { Component, Input } from "@angular/core";

@Component({
  selector: "app-child",
  template: `
    <h1>{{type}}</h1>
  `
})
export class ChildComponent {
  @Input()
  type = "success";

  constructor() {
    console.log("[Child] constructor()");
  }
}
