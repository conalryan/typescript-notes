import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'element-directive-component',
  template: `
    <div class="card card-block">Testing if the element directive is working</div>
  `,
  styles: []
})
export class ElementDirectiveComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
