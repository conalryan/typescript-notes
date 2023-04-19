import './app.element.scss';
import './display/display.element';

export class AppElement extends HTMLElement {
  public static observedAttributes = [];

  connectedCallback() {
    this.innerHTML = `
      <scss-display />
    `;
  }
}
customElements.define('app-root', AppElement);
