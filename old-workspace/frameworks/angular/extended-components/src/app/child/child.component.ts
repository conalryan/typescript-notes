import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent extends BaseComponent {

  constructor() {
    super();
   }
}
