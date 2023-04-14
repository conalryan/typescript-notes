import { Component, HostListener, OnInit } from "@angular/core";

@Component({
  selector: "app-host-listener",
  template: `
    <div hostListenerEx>
      <p>
        host-listener works!
      </p>
    </div>
    <button counting>Increment</button>
  `,
  styles: []
})
export class HostListenerComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
