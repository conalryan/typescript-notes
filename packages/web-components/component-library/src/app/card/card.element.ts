const titles = [
  { title: 'The Five Orange Pips', subtitle: 'A delivery of innocous letter followed by death.' },
  { title: 'A Study in Scarlet', subtitle: 'Dr. John Watson meets Mr. Sherlock Holmes.' },
  { title: 'The Hound of the Baskervilles', subtitle: 'A mysterious hound terrifies a town.' }
]

export class WebCardElement extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    console.log('web-card::constructor');
  }

  connectedCallback() {
    console.log('web-card::connectedCallback');
    this.render();
  }

  private render() {
    const { shadowRoot } = this;
    shadowRoot.innerHTML = '';

    const templateNode = document.getElementById('web-card__template');
    if (templateNode) {
      titles.forEach(title => {
        const instance = document.importNode((templateNode as HTMLTemplateElement).content, true);
        instance.querySelector('.web-card__title').innerHTML = title.title;
        instance.querySelector('.web-card__subtitle').innerHTML = title.subtitle;

        shadowRoot.appendChild(instance);
      })
    } else {
      shadowRoot.innerHTML = '<p>Shadow Root failed. You must pass a template with id="web-card__template".</p>';
    }
  }
}

customElements.define('web-card', WebCardElement);