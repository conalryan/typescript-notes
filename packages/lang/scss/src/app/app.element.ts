import './app.element.scss';
import './display/display.element';
import './center-items-block/center-items-block.element';
import './center-items-flex/center-items-flex.element';

export class AppElement extends HTMLElement {
  public static observedAttributes = [];

  connectedCallback() {
    this.innerHTML = `
      <!-- <scss-display /> -->

      <center-items-block />

      <!-- <center-items-flex /> -->
    `;
  }
}
customElements.define('app-root', AppElement);
