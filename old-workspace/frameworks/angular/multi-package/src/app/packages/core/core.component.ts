import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-core',
  template: `
    <p>
      core Works!
    </p>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class CoreComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
