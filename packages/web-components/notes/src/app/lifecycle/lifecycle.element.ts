export class WebLifecycleElement extends HTMLElement {
  constructor() {
    super();
    console.log('web-lifecycle::constructor');
  }

  connectedCallback() {
    console.log('web-lifecycle::connectedCallbacek');
    this.innerHTML = `web-lifecycle BOOM`;
    this.abort();
  }

  disconnectedCallback() {
    console.log('web-lifecycle::disconnectedCallback');
  }

  private abort() {
    document.querySelector('web-lifecycle').remove(); // will call disconnectedCallback()
  }
}

customElements.define('web-lifecycle', WebLifecycleElement);

