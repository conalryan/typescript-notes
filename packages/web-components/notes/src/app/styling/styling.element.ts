export class WebStylingInlineElement extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        .web-styling-inline-header {
          color: blue;
        }
        .web-styling-inline-paragraph {
          background-color: gray;
        }
      </style>
      <h1 class="web-styling-inline-header">Some h1 here</h1>
      <p class="web-styling-inline-paragraph">A paragrah of text here</p>
    `
  }
}
customElements.define('web-styling-inline', WebStylingInlineElement);

import './styling.element.scss';

export class WebStylingImportElement extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <h1 class="web-styling-import-header">Some h1 here</h1>
      <p class="web-styling-import-paragraph">A paragrah of text here</p>
    `
  }
}
customElements.define('web-styling-import', WebStylingImportElement);

export class WebStylingShadowElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open'});
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        h1 {
          color: purple;
        }
      </style>
      <h1 class="web-styling-import-header">Some h1 here but it won't be styled by imported css</h1>
      <link rel="stylesheet" href="/assets/styling.css" />
      <p class="web-styling-import-paragraph">A paragrah of text here styled with link</p>
    `;
  }
}
customElements.define('web-styling-shadow-dom', WebStylingShadowElement);
