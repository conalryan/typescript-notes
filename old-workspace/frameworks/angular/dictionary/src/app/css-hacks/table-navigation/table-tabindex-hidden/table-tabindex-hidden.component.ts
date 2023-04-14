import {Component, OnInit} from '@angular/core';
import {Item, items} from '../model/items';

@Component({
  selector: 'app-table-tabindex-hidden',
  templateUrl: './table-tabindex-hidden.component.html',
  styleUrls: ['./table-tabindex-hidden.component.scss']
})
export class TableTabindexHiddenComponent implements OnInit {

  items = items;
  hoverId;
  focusId;

  constructor() {
  }

  ngOnInit() {
  }

  // ====================================== Formatting ===========================================
  showActionButtons(itemId: number): boolean {
    return this.hoverId === itemId || this.focusId === itemId;
  }

  isRowFocused(itemId: number): boolean {
    return this.focusId === itemId;
  }
  // ======================================= Actions =============================================
  onRowKeyup(event, itemId: number): void {
    console.log('--> onRowKeyup()');
    if (event.keyCode === 13) {
      this.focusId = itemId;
    } else if (event.keyCode === 9) {
      if (event.path[0].id === `item-${itemId}`) {
        // nothing to do landing on same row
        return;
      } else if (event.path[0].nodeName !== 'BUTTON') {
        this.focusId = null;
      }
    }
  }

  onRowClick(event, itemId: number): void {
    /*if (itemId !== this.focusId) {
      this.focusId = null;
    }*/
    this.focusId = itemId;
  }

  resetFocusId(): void {
    this.focusId = null;
  }

  onViewClick(item: Item) {
    alert('onViewClick()');
  }

  onEditClick(item: Item) {
    alert('onEditClick()');
  }
}
