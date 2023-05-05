import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-inline',
  template: `
    <h1>{{title}}</h1>
  `,
  styles: []
})
export class InlineComponent implements OnInit {

  title = 'This Component has an inline template';

  constructor() {
  }

  ngOnInit() {
  }

}
