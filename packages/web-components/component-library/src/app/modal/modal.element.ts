export class WebModalElement extends HTMLElement {
  static observedAttributes = ['title', 'content'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    console.log('web-modal::constructor');
  }

  get title(): string { return this.getAttribute('title'); }
  set title(title_attr) {
    if (title_attr) {
      this.setAttribute('title', title_attr)
    } else {
      this.removeAttribute('title');
    }
  }


  get content(): string { return this.getAttribute('content'); }
  set content(content_attr) {
    if (content_attr) {
      this.setAttribute('content', content_attr)
    } else {
      this.removeAttribute('content');
    }
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    console.log('web-modal::attributeChangedCallback');
    if (oldValue !== newValue) {
      console.log('web-modal::attributeChangedCallback -> value changed', attrName, oldValue, newValue);
      this[attrName] = newValue;
    }
    this.render();
  }

  connectedCallback(): void {
    console.log('web-modal::connectedCallback');
    this.render();
  }

  private render(): void {
    console.log('web-modal::render');
    this.shadowRoot.innerHTML = '';

    const template = document.getElementById('web-modal__template') as HTMLTemplateElement;
    if (template) {
      const instance = document.importNode(template.content, true);
      instance.querySelector('.web-modal__title').innerHTML = this.title;
      instance.querySelector('.web-modal__content').innerHTML = this.content;

      this.shadowRoot.appendChild(instance);
    } else {
      this.shadowRoot.innerHTML = '<p>Shadow Root failed. You must pass a template with id="web-modal__template".</p>';
    }
  }
}
customElements.define('web-modal', WebModalElement);
