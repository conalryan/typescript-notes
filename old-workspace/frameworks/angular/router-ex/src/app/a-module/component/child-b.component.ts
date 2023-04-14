import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-child-b',
  template: `
    <p>
      child-b works!
    </p>
  `,
  styles: []
})
export class ChildBComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
