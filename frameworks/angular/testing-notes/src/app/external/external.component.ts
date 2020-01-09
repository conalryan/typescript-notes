import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-external',
  templateUrl: './external.component.html',
  styleUrls: ['./external.component.scss']
})
export class ExternalComponent implements OnInit {

  title = 'This Component has an external template';

  constructor() { }

  ngOnInit() {
  }

}
