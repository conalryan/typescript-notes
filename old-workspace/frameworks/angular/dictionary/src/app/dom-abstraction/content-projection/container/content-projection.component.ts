import { Component, OnInit } from "@angular/core";

/**
 * Content projection is a way to import HTML content from outside the component and insert that content into the
 * component's template in a designated spot.
 * AngularJS developers know this technique as transclusion.
 */
@Component({
  selector: "app-content-projection",
  template: `
    <p>
      content-projection works!
    </p>

    <app-child-wrapper>
      <app-child></app-child>
    </app-child-wrapper>

    <table class="table">
    <thead>
      <tr>
        <th class="col">Company</th>
        <th class="col-6">Contact</th>
        <th>Country</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>Alfreds Futterkiste</td>
        <td>Maria Anders</td>
        <td>Germany</td>
      </tr>
      <tr>
        <td>Centro comercial Moctezuma</td>
        <td>Francisco Chang</td>
        <td>Mexico</td>
      </tr>
      </tbody>
    </table>
  `
})
export class ContentProjectionComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
