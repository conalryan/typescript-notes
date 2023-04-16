export class WebAttachShadowDomElement extends HTMLElement {

  connectedCallback() {
    this.innerHTML = `
      <div id='shadow-content'></div>
      <h1 id='header'>This will NOT have a red background.</h1>`;

    const shadowRoot = document.getElementById('shadow-content').attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <style>
        h1 {
          background: red;
          color: #fff;
        }
      </style>
      <h1 id='header'>This will HAVE a red background.</h1>`;
  }
}
customElements.define('web-attach-shadow-dom', WebAttachShadowDomElement);

export class WebShadowDomElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.innerHTML = `
      <h1>This content will NEVER show!</h1>
      <div id="web-shadow-host"></div>
    `;

    this.shadowRoot.innerHTML = 'This content will show';

    const p = document.createElement('p');
    p.innerHTML = 'appending a paragraph';
    this.shadowRoot.append(p);
  }
}
customElements.define('web-shadow-dom', WebShadowDomElement);
