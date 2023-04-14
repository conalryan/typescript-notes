import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-fixed-height-master",
  template: `
    <div class="container">
      <section id="top">
        <h2>Master Section</h2>
        <div class="row">
          <div class="col-1">
            col-1
          </div>
          <div class="col-1">
            col-1
          </div>
          <div class="col-1">
            col-1
          </div>
        </div>
      </section>
      <div class="row fixed-height" #fixedHeight [style.height.px]="100">
        <app-fixed-height-list class="col-5" id="list"></app-fixed-height-list>
        <app-fixed-height-detail class="col-7" id="right"></app-fixed-height-detail>
      </div>
      <div #fixedBottom class="fixed-bottom">
        Fixed bottom
      </div>
    </div>
  `,
  styles: [
    `
      div,
      section {
        border: 0.0625rem solid gray;
      }
      .fixed-height {
        overflow-y: auto;
      }
    `
  ]
})
export class FixedHeightMasterComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

@Component({
  selector: "app-fixed-height-list",
  template: `
    <section>
      <h2>List Section</h2>
      <table class="table table-striped table-hover">
        <thead>
        <td>
          The table head
        </td>
        </thead>
        <tbody>
        <tr>
          <td>The table field</td>
        </tr>
        </tbody>
      </table>
    </section>
  `,
  styles: []
})
export class FixedHeightListComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

@Component({
  selector: "app-fixed-height-detail",
  template: `
    <section>
      <h2>Detail Section</h2>

    </section>
  `,
  styles: []
})
export class FixedHeightDetailComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
