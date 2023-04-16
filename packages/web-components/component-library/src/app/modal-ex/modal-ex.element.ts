import '../modal/modal.element';

export class WebModalExElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    this.render();
  }

  private render(): void {
    this.innerHTML = `
      <template id="web-modal__template">
        <div class="web-modal__title"></div>
        <div class="web-modal__content"></div>
      </template>
      <web-modal></web-modal>
    `;
  }
}

customElements.define('web-modal-ex', WebModalExElement);
