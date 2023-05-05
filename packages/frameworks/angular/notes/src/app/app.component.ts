import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChangeDetectionModule } from './change-detection/change-detection.module';

@Component({
  standalone: true,
  imports: [RouterModule, ChangeDetectionModule],
  selector: 'typescript-notes-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frameworks-angular-notes';
}
