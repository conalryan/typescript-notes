export class WebHomeElement extends HTMLElement {
  constructor() {
    super();
    console.log('web-home::constructor');
  }

  connectedCallback() {
    console.log('web-home::connectedCallback');
    this.innerHTML = `<h1>HOME</h1>`;
  }
}

customElements.define('web-home', WebHomeElement);
