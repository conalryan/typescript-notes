import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-parent",
  template: `
    <p>parent works!</p>
    <app-child-a></app-child-a>
    <app-child-b></app-child-b>
  `,
  styles: []
})
export class ParentComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
