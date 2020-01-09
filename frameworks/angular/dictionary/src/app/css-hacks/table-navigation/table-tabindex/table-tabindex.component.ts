import { Component, OnInit } from '@angular/core';
import {items} from '../model/items';

@Component({
  selector: 'app-table-tabindex',
  templateUrl: './table-tabindex.component.html',
  styleUrls: ['./table-tabindex.component.scss']
})
export class TableTabindexComponent implements OnInit {

  items = items;

  constructor() { }

  ngOnInit() {
  }

}
