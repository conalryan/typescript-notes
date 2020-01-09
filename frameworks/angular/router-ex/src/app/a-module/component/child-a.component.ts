import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-child-a',
  template: `
    <p>
      child-a works!
    </p>
  `,
  styles: []
})
export class ChildAComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
