export class WebModalElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    this.render();
  }

  private render(): void {
    const { shadowRoot } = this;
    shadowRoot.innerHTML = '';

    const template = document.getElementById('web-modal__template') as HTMLTemplateElement;
    if (template) {
      const instance = document.importNode(template.content, true);
      instance.querySelector('.web-modal__title').innerHTML = `Title of the modal`;
      instance.querySelector('.web-modal__content').innerHTML = 'Content of the modal';
      shadowRoot.appendChild(instance);
    } else {
      shadowRoot.innerHTML = '<p>Shadow Root failed. Please try again later.</p>';
    }
  }
}

customElements.define('web-modal', WebModalElement);
