import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-card-hover",
  template: `
    <p>card-hover works!</p>
    <div class="card card-block"
      [cardHover]="{querySelector:'.card-text'}">
      <h4 class="card-title">Test it</h4>
      <p class="card-text"
         [style.display]="'none'">Now you see it</p>

    </div>
  `,
  styles: []
})
export class CardHoverComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
