import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'element-directive-wrapper-component',
  template: `
    <h1>Element Directive Wrapper</h1>
    <p>Inside paragraph element</p>
    <element-directive-component></element-directive-component>
  `,
  styles: []
})
export class ElementDirectiveWrapperComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
