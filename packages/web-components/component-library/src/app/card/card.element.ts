const titles = [
  { title: 'The Five Orange Pips', subtitle: 'A delivery of innocous letter followed by death.' },
  { title: 'A Study in Scarlet', subtitle: 'Dr. John Watson meets Mr. Sherlock Holmes.' },
  { title: 'The Hound of the Baskervilles', subtitle: 'A mysterious hound terrifies a town.' }
]

export class WebCardElement extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const { shadowRoot } = this;
    shadowRoot.innerHTML = '';

    const templateNode = document.getElementById('web-card-template');
    if (templateNode) {
      titles.forEach(title => {
        const instance = document.importNode((templateNode as HTMLTemplateElement).content, true);
        instance.querySelector('.web-card__title').innerHTML = title.title;
        instance.querySelector('.web-card__subtitle').innerHTML = title.subtitle;

        shadowRoot.appendChild(instance);
      })
    } else {
      shadowRoot.innerHTML = '<p>Shadow Root failed. Please try again later.</p>';
    }
  }
}

customElements.define('web-card', WebCardElement);
