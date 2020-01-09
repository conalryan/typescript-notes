import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-foo',
  template: `
    <p><i class="fa fa-shopping-cart" aria-hidden="true"></i>foo Works!</p>
    <i class="fa fa-address-card" aria-hidden="true"></i> Profile
    <ngb-datepicker></ngb-datepicker>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class FooComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
