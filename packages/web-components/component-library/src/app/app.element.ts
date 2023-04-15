import './app.element.scss';
import './card/card.element';

export class AppElement extends HTMLElement {
  title = 'web-components-component-library';

  connectedCallback() {
    this.innerHTML = `<div>
      <h1>${this.title}</h1>
      <web-card></web-card>
    </div>`;
  }
}

customElements.define('typescript-notes-root', AppElement);
