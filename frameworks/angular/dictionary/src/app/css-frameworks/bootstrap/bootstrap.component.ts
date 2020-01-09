import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from "@angular/core";

class Item {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

@Component({
  selector: "app-bootstrap",
  templateUrl: "./bootstrap.component.html",
  styleUrls: ["./bootstrap.component.scss"]
})
export class BootstrapComponent implements AfterViewInit {
  themes = ["ama", "pi"];
  myTheme = "ama";
  myInput;
  myInputDisabled = "input is disabled";

  items: Item[] = [
    {
      id: 423,
      firstName: "Bob",
      lastName: "Smith",
      email: "bs@this.com"
    },
    {
      id: 22,
      firstName: "John",
      lastName: "Doe",
      email: "jd@that.com"
    },
    {
      id: 516,
      firstName: "Jane",
      lastName: "Doe",
      email: "jnd@that.com"
    }
  ];

  @ViewChild("prevTabTarget")
  prevTabTarget: ElementRef;
  @ViewChildren("trRef")
  trRef: QueryList<ElementRef>;
  @ViewChild("nextTabTarget")
  nextTabTarget: ElementRef;

  selectedIndex = 0;
  focusedId: number;
  hoverId: number;

  constructor() {}

  ngAfterViewInit() {
    this.trRef.first.nativeElement.focus();
  }

  // ====================================== Formatting ===========================================
  showActionButtons(itemId: number): boolean {
    return this.hoverId === itemId || this.focusedId === itemId;
  }

  isRowFocused(itemId: number): boolean {
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
  onRowKeyup(event, itemId: number): void {
    if (event.keyCode === 9 && !event.shiftKey) {
      // user pressed tab key
      if (event.path[0].id === "profile-0") {
        // user is landing on first row
        this.selectedIndex = 0;
        this.trRef.toArray()[this.selectedIndex].nativeElement.focus();
      } else if (event.path[0].nodeName === "BUTTON") {
        // user is landing on action button - nothing to do, tabindex will catch it.
        return;
      } else {
        // user is landing on another row, jump outside table
        this.focusedId = null;
        this.nextTabTarget.nativeElement.focus();
      }
    } else if (event.keyCode === 9 && event.shiftKey) {
      // user pressed shift + tab
      const lastIndex = this.items.length - 1;
      if (event.path[0].id === `profile-${lastIndex}`) {
        // user is landing on last row
        this.selectedIndex = lastIndex;
      } else {
        this.focusedId = null;
        this.prevTabTarget.nativeElement.focus();
      }
    } else if (event.keyCode === 13) {
      this.focusedId = itemId;
    } else if (event.keyCode === 38) {
      this.focusedId = null;
      // previous id or self if at beginning of list.
      this.selectedIndex =
        this.selectedIndex === 0 ? this.selectedIndex : --this.selectedIndex;
      this.trRef.toArray()[this.selectedIndex].nativeElement.focus();
    } else if (event.keyCode === 40) {
      this.focusedId = null;
      // next id of self if at last item in list.
      this.selectedIndex =
        this.selectedIndex === this.items.length - 1
          ? this.selectedIndex
          : ++this.selectedIndex;
      this.trRef.toArray()[this.selectedIndex].nativeElement.focus();
    } else {
      event.preventDefault();
      return;
    }
  }

  onRowKeydownEnter(event: KeyboardEvent, itemId: number): void {
    this.focusedId = itemId;
  }

  onViewClick(item: Item): void {
    alert("-->onViewClick");
    console.log(item);
  }

  onEditClick(item: Item): void {
    alert("-->onEditClick");
    console.log(item);
  }

  onTableBlur() {
    this.selectedIndex = 0;
    this.focusedId = null;
  }
}
