// const titles = [
//   { title: 'The Five Orange Pips', subtitle: 'A delivery of innocous letter followed by death.' },
//   { title: 'A Study in Scarlet', subtitle: 'Dr. John Watson meets Mr. Sherlock Holmes.' },
//   { title: 'The Hound of the Baskervilles', subtitle: 'A mysterious hound terrifies a town.' }
// ]

export class WebCardElement extends HTMLElement {
  static observedAttributes = ['title', 'subtitle', 'cover'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    console.log('web-card::constructor');
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    console.log('web-card::attributeChangedCallback', attrName, oldValue, newValue);
    if (oldValue !== newValue && newValue !== null) {
      this[attrName] = newValue;
    }
    // this.render();
  }

  connectedCallback() {
    console.log('web-card::connectedCallback');
    this.render();
  }

  disconnectedCallback() {
    console.log('web-card::disconnectedCallback');
  }

  private render() {
    console.log('web-card::render');
    this.shadowRoot.innerHTML = '';

    const templateNode = document.getElementById('web-card__template') as HTMLTemplateElement;
    if (templateNode) {
      // titles.forEach(title => {
      //   const instance = document.importNode((templateNode as HTMLTemplateElement).content, true);
      //   instance.querySelector('.web-card__title').innerHTML = title.title;
      //   instance.querySelector('.web-card__subtitle').innerHTML = title.subtitle;

      //   this.shadowRoot.appendChild(instance);
      // })
      const instance = document.importNode(templateNode.content, true);
      instance.querySelector('.web-card__title').innerHTML = this['title'];
      instance.querySelector('.web-card__subtitle').innerHTML = this['subtitle'];
      (instance.querySelector('.web-card__cover') as HTMLImageElement).src = this['cover'];

      this.shadowRoot.appendChild(instance);
    } else {
      this.shadowRoot.innerHTML = '<p>Shadow Root failed. You must pass a template with id="web-card__template".</p>';
    }
  }
}
customElements.define('web-card', WebCardElement);
