export class WebAtributesElement extends HTMLElement {
  static get observedAttributes() {
    return ['message'];
  }

  get message() {
    return this.getAttribute('message');
  }

  set message(msg: string) {
    if (msg) {
      this.setAttribute('message', msg);
    } else {
      this.removeAttribute('message');
    }
  }

  connectedCallback() {
    this.render();
  }

  attributeChangeCallback(attrName, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[attrName] = newValue;
    }

    this.render();
  }

  private render() {
    this.innerHTML = `
     <p>Received the following message: ${this.message}</p>
    `
  }
}

customElements.define('web-attributes', WebAtributesElement);

export class PassAttributesElement extends HTMLElement {
  constructor(
    private msg = 'From the parent to child',
  ) {
    super();
  }

  connectedCallback() {
    this.render();
  }

  private render() {
    this.innerHTML = `<web-attributes message="${this.msg}" />`;
  }
}

customElements.define('pass-attributes', PassAttributesElement);
