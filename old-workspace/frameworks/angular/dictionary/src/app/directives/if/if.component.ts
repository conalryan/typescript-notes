import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-if",
  template: `
    <p *if="shouldDisplay">
      if works!
    </p>
    <button type="button" (click)="shouldDisplay = !shouldDisplay">Toggle Display</button>
  `,
  styles: []
})
export class IfComponent implements OnInit {
  shouldDisplay = false;
  constructor() {}

  ngOnInit() {}
}
