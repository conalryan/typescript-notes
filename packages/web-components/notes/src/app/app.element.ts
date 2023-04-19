// import './app.scss';
import './attributes/web-attributes.element';
import './lifecycle/lifecycle.element';
import './shadow-dom/shadow-dom.element';
import './styling/styling.element';
import './template/template.element';

export class AppElement extends HTMLElement {
  static observedAttributes = [];

  title = 'Web Component Notes';

  // <web-attributes /> -> will print null
  // <pass-attributes />
  //
  // <web-lifecycle />
  //
  // <web-shadow-dom />
  // <web-attach-shadow-dom />
  //
  // <web-template /> -> calling directly will fail unless client provides necessary template
  // <use-web-template />
  //
  // <web-styling-inline />
  // <web-styling-import />
  // <web-styling-shadow-dom />

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    this.render();
  }

  private render(): void {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="/assets/app.scss" />
      <h1>${this.title}</h1>
      <web-styling-shadow-dom />
    `;
  }
}
customElements.define('app-root', AppElement);
