import { Component } from '@angular/core';
import { unicornRocket } from '@myworkspace/utilities';

@Component({
  selector: 'myworkspace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = `${unicornRocket} app!`;
}
