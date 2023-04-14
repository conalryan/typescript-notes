import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-ngb',
  templateUrl: './my-ngb.component.html',
  styleUrls: ['./my-ngb.component.scss']
})
export class MyNgbComponent implements OnInit {

  name = 'test this popover';
  myModel = {
    myInput: '',
    myDate: null
  };

  constructor() { }

  ngOnInit() {
  }

  onDateSelect($event: any) {
    console.log('SELECT');
  }

  navigate($event: any) {
    console.log('NAVIGATE');
  }
}
