export class BlogModalElement extends HTMLElement {
  static get observedAttributes() {
    return ['open', 'title', 'subtitle', 'synopsis', 'cover'];
  }

  close: CustomEvent;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.close = new CustomEvent('close', {
      bubbles: true,
      cancelable: false,
      detail: {
        open: false
      }
    })
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName !== 'open' && oldValue !== newValue) {
      this[attrName] = newValue;
    } else if (attrName === 'open') {
      this[attrName] = this.hasAttribute(attrName);
    }
    this.render();
  }

  private render() {
    this.shadowRoot.innerHTML = '';
    const templateNode = document.getElementById('modal-template') as HTMLTemplateElement;

    if (templateNode) {
      const instance = document.importNode(templateNode.content, true);
      const wrapper = instance.querySelector('.wrapper');

      const close = instance.querySelector('.close') as HTMLElement;
      const closeEvent = this.close;
      close.onclick = () => {
        this.dispatchEvent(closeEvent);
      }
      this.shadowRoot.addEventListener('close', () => {
        wrapper.classList.remove('open');
        this['open'] = false;
      });

      if (this['open'] === true) {
        instance.querySelector('.wrapper').classList.add('open');
      }

      instance.querySelector('.title').innerHTML = this['title'];
      instance.querySelector('.subtitle').innerHTML = this['subtitle'];
      (instance.querySelector('.cover') as HTMLImageElement).src = this['cover'];
      instance.querySelector('.synopsis').innerHTML = this['synopsis'];

      this.shadowRoot.appendChild(instance);
    }
  }
}
customElements.define('blog-modal', BlogModalElement);
