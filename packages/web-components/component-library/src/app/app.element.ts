import './app.element.scss';
import './card/card.element';
import './shadow-dom/shadow-dom.element';
import './cards/cards.element';
import './lifecycle/lifecycle.element';
import './modal/modal.element';
import './modal-ex/modal-ex.element';
import './home/home.element';

export class AppElement extends HTMLElement {
  title = 'web-components-component-library';

  // <web-home />

  // Internals
  // <web-lifecycle />
  // <web-shadow-dom />

  // Cards
  // <web-card /> -> calling directly will fail unless client provides necessary template
  // <web-cards />

  // Modals
  // <web-modal-ex />

  connectedCallback() {
    this.innerHTML = `<div>
      <h1>${this.title}</h1>

      <web-modal />
    </div>`;
  }
}

customElements.define('typescript-notes-root', AppElement);
