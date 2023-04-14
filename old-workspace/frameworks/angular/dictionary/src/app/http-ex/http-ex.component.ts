import { Component, OnInit } from '@angular/core';
import {HttpExService} from './http-ex.service';

@Component({
  selector: 'app-http-ex',
  template: `
    <h3>HttpExComponent</h3>
    <button type="button"
            class="btn btn-primary"
            (click)="makeIntentionalError()">
      Make Intentional Error
    </button>
  `,
  styles: []
})
export class HttpExComponent implements OnInit {

  constructor(private httpExService: HttpExService) { }

  ngOnInit() {
    this.httpExService.getUsers().subscribe((data) => {
      console.log(data);
    });
  }

  makeIntentionalError() {
    this.httpExService.makeIntentionalError().subscribe(data => {
      console.log(data);
    });
  }
}
