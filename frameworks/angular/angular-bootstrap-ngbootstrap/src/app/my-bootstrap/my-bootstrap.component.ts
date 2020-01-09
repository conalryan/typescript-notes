import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-bootstrap',
  templateUrl: './my-bootstrap.component.html',
  styleUrls: ['./my-bootstrap.component.scss']
})
export class MyBootstrapComponent implements OnInit {

  themes = [
    'ama',
    'pi'
  ];
  myTheme = 'ama';
  myInput;
  myInputDisabled = 'input is disabled';

  constructor() { }

  ngOnInit() {
  }

}
