import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <h1>{{ title }}</h1>
  `
})
export class AboutComponent implements OnInit {

  title = 'About component works!'

  constructor() { }

  ngOnInit(): void {}

}
