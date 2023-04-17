import './app.element.scss';
import './card/card.element';
import './cards/cards.element';
import './modal/modal.element';
import './modal-ex/modal-ex.element';

export class AppElement extends HTMLElement {
  // Cards
  // <web-card /> -> calling directly will fail unless client provides necessary template
  // <web-cards />

  // Modals
  // <web-modal /> -> calling directly will fail unless client provides necessary template
  // <web-modal-ex />

  connectedCallback() {
    this.innerHTML = `
      <header class='navbar'>Sherlock Holmes - The Blog</header>
      <web-cards />
    `;
  }
}
customElements.define('web-component-library', AppElement);
