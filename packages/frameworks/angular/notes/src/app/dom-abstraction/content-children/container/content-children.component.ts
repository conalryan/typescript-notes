import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-content-children",
  template: `
  <p>
    content-children works!
  </p>

  <app-content-child>
    <span>First child</span>
  </app-content-child>

  <app-content-child>
    <span>Second child</span>
  </app-content-child>

  <app-content-child>
    <span #tplRefInsideNgContent>Third child</span>
  </app-content-child>
  `
})
export class ContentChildrenComponent implements OnInit {
  constructor() {
    console.log("[Parent] constructor() { } ");
  }

  ngOnInit() {
    console.log("[Parent] ngOnInit() { } ");
  }
}
