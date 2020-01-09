import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  title: string;
  dateInit: number;
  clickCount = 0;

  constructor() {
    this.title = 'base';
  }

  ngOnInit(): void {
    this.dateInit = Date.now();
    console.log('BASE INIT: ', this.dateInit);
  }

  onClick(): void {
    this.clickCount++;
  }

  format(count: number): string {
    return `You have clicked ${count} times`;
  }
}
