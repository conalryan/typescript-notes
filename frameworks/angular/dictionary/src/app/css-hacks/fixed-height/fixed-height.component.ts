import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

/**
 *
 * window.innerHeight: 629
 * window.innerWidth : 833
 *
 * window.outerHeight: 726
 * window.outerWidth: 1280
 */
@Component({
  selector: "app-fixed-height",
  templateUrl: "./fixed-height.component.html",
  styleUrls: ["./fixed-height.component.scss"]
})
export class FixedHeightComponent implements OnInit {
  @ViewChild("fixedHeight")
  fixedHeight: ElementRef;
  @ViewChild("fixedBottom")
  fixedBottom: ElementRef;
  innerHeight: number;

  constructor(private _hostElement: ElementRef) {
    console.log(
      "FixedHeightComponent constructor() { ElementRef, offsetLeft, offsetTop }"
    );
    console.log(this._hostElement);
    console.log(this._hostElement.nativeElement.offsetLeft); // will be 0 here, not yet set in DOM
    console.log(this._hostElement.nativeElement.offsetTop); // will be 0 here, not yet set in DOM
  }

  ngOnInit() {
    console.log(
      "FixedHeightComponent ngOnInit() { ElementRef, offsetLeft, offsetTop }"
    );
    console.log(this._hostElement);
    console.log(this._hostElement.nativeElement.offsetLeft);
    console.log(this._hostElement.nativeElement.offsetTop);

    // calc
    const bottom =
      window.innerHeight - this.fixedBottom.nativeElement.offsetTop;
    this.innerHeight =
      window.innerHeight - this.fixedHeight.nativeElement.offsetTop - bottom;

    console.log("window.outerHeight: ", window.outerHeight);
    console.log("window.innerHeight: ", window.innerHeight);

    console.log("fixedBottom: ", this.fixedBottom.nativeElement.offsetTop);
    console.log(this.fixedBottom);

    console.log("bottom: ", bottom);

    console.log("this.innerHeight: ", this.innerHeight);

    console.log("view child: ");
    console.log(this.fixedHeight);
  }
}
