export class WebCard extends HTMLElement {

  connectedCallback() {
    this.innerHTML = 'web card connectedCallback';
  }
}

customElements.define('web-card', WebCard);
