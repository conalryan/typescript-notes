export class WebShadowDomElement extends HTMLElement {

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

customElements.define('web-shadow-dom', WebShadowDomElement);
