import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  interpolatedValue = 'Hello from Component';
  headerColor = 'red';

  ngOnInit() {
    this.headerColor = 'blue';
  }
}
