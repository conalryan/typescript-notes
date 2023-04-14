import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-child-a',
  templateUrl: './child-a.component.html',
  styleUrls: ['./child-a.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildAComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  }

}
