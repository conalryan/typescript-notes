import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Item, items} from '../model/items';

@Component({
  selector: 'app-table-arrow-keys',
  templateUrl: './table-arrow-keys.component.html',
  styleUrls: ['./table-arrow-keys.component.scss']
})
export class TableArrowKeysComponent implements AfterViewInit {

  @ViewChild('prevTabTarget') prevTabTarget: ElementRef | undefined;
  @ViewChildren('trRef') trRef: QueryList<ElementRef> | undefined
  @ViewChild('nextTabTarget') nextTabTarget: ElementRef | undefined

  items = items;
  selectedIndex = 0;
  focusedId: number | null = null;
  hoverId: number | null = null;

  constructor() {
  }

  ngAfterViewInit() {
    this.trRef!.first.nativeElement.focus();
  }

  // ====================================== Formatting ===========================================
  showActionButtons(itemId: number | undefined): boolean {
    return this.hoverId === itemId || this.focusedId === itemId;
  }

  isRowFocused(itemId: number | undefined): boolean {
    return this.focusedId === itemId;
  }

  // ======================================= Acitons =============================================
  /**
   * 9 = tab.
   * 9 + shiftKey = back tab.
   * 13: Enter
   * 38: Up
   * 40: Down
   *
   * @param event
   * @param {number} itemId
   */
  onRowKeyup(event: any, itemId: number | undefined): void {
    if (event.keyCode === 9 && !event.shiftKey) {
      // user pressed tab key
      if (event.path[0].id === 'profile-0') {
        // user is landing on first row
        this.selectedIndex = 0;
        this.trRef!.toArray()[this.selectedIndex].nativeElement.focus();
      } else if (event.path[0].nodeName === 'BUTTON') {
        // user is landing on action button - nothing to do, tabindex will catch it.
        return;
      } else {
        // user is landing on another row, jump outside table
        this.focusedId = null;
        this.nextTabTarget!.nativeElement.focus();
      }
    } else if (event.keyCode === 9 && event.shiftKey) {
      // user pressed shift + tab
      const lastIndex = this.items.length - 1;
      if (event.path[0].id === `profile-${lastIndex}`) {
        // user is landing on last row
        this.selectedIndex = lastIndex;
      } else {
        this.focusedId = null;
        this.prevTabTarget!.nativeElement.focus();
      }
    } else if (event.keyCode === 13) {
      this.focusedId = itemId || null;
    } else if (event.keyCode === 38) {
      this.focusedId = null;
      // previous id or self if at beginning of list.
      this.selectedIndex = this.selectedIndex === 0 ? this.selectedIndex : --this.selectedIndex;
      this.trRef!.toArray()[this.selectedIndex].nativeElement.focus();
    } else if (event.keyCode === 40) {
      this.focusedId = null;
      // next id of self if at last item in list.
      this.selectedIndex = this.selectedIndex === this.items.length - 1 ? this.selectedIndex : ++this.selectedIndex;
      this.trRef!.toArray()[this.selectedIndex].nativeElement.focus();
    } else {
      event.preventDefault();
      return;
    }
  }

  onRowKeydownEnter(itemId: number | undefined): void {
    this.focusedId = itemId || null;
  }

  onRowClick(event: any, itemId: number | undefined): void {
    if (itemId !== this.focusedId) {
      this.focusedId = null;
    }
  }

  resetFocusId(): void {
    this.focusedId = null;
  }

  onViewClick(item: Item): void {
    alert('-->onViewClick');
    console.log(item);
  }

  onEditClick(item: Item): void {
    alert('-->onEditClick');
    console.log(item);
  }

  onTableBlur() {
    this.selectedIndex = 0;
    this.focusedId = null;
  }
}
