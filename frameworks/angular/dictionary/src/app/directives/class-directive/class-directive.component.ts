import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-class-directive",
  template: `
    <div class="card card-block classDirective">Testing if the class directive is working</div>
  `,
  styles: []
})
export class ClassDirectiveComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
