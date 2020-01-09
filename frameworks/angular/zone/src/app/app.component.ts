import {ApplicationRef, Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular 5';

  constructor(app: ApplicationRef) {
    setTimeout(() => {
      this.title = 'updated';
      app.tick();
    }, 1000);
  }
}
