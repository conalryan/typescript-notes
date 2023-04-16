import './app.element.scss';
import './card/card.element';
import './shadow-dom/shadow-dom.element';
import './cards/cards.element';

export class AppElement extends HTMLElement {
  title = 'web-components-component-library';

  // <web-card></web-card>
  // <web-cards />
  // <web-shadow-dom />

  connectedCallback() {
    this.innerHTML = `<div>
      <h1>${this.title}</h1>

      <web-cards />

    </div>`;
  }
}

customElements.define('typescript-notes-root', AppElement);
