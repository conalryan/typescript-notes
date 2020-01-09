import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  minutes = 0;
  gender = 'f';
  fly = true;
  logo = 'https://angular.io/assets/images/logos/angular/angular.png';
  heroes: string[] = ['Magneta', 'Celeritas', 'Dynama'];

  inc(i: number) {
    this.minutes = Math.min(5, Math.max(0, this.minutes + i));
  }

  male() {
    this.gender = 'm';
  }

  female() {
    this.gender = 'f';
  }

  other() {
    this.gender = 'o';
  }

  /*public setLanguage = (language) => {
    localStorage.setItem('localeId', language);
    console.log('locale set to:' + language);
    location.reload(true);
  }*/

  public setLanguage(language): void {
    localStorage.setItem('localeId', language);
    console.log('locale set to:' + language);
    location.reload(true);
  }

  today = new Date();

  conditions = {
    guaranteeRequired: false,
    deposit: '22',
    rateChange: false,
    cancellationDeadline: '2017-11-25T00:00:00',
    mealList: [
      'BRK',
      'LUN',
      'DIN'
    ]
  };

  myInput = null;
}
