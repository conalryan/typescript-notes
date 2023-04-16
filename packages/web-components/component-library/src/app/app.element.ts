import './app.element.scss';
import './card/card.element';
import './shadow-dom/shadow-dom.element';
import './cards/cards.element';
import './lifecycle/lifecycle.element';
import './modal-ex/modal-ex.element';

export class AppElement extends HTMLElement {
  title = 'web-components-component-library';

  // Internals
  // <web-lifecycle />
  // <web-shadow-dom />

  // Cards
  // <web-card />
  // <web-cards />

  // Modals
  // <web-modal-ex />

  connectedCallback() {
    this.innerHTML = `<div>
      <h1>${this.title}</h1>
      <web-lifecycle />
    </div>`;
  }
}

customElements.define('typescript-notes-root', AppElement);
