import {Component, OnInit} from '@angular/core';
import {MyNgbModel} from "./model/MyNgbModel";

@Component({
  selector: 'app-ngb',
  templateUrl: './ngb.component.html',
  styleUrls: ['./ngb.component.scss']
})
export class NgbComponent implements OnInit {

  title = 'This Component has an external template';
  myNgbModel: MyNgbModel;
  myNgbModelArray: MyNgbModel[] = [];

  constructor() {
  }

  ngOnInit() {
    this.myNgbModel = new MyNgbModel('Initial value');
    this.myNgbModelArray.push(this.myNgbModel);
  }

  submit() {
    console.log('[ngb.component] submit():');
    console.log(this.myNgbModel);
  }
}
