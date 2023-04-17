export class WebTemplateElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    console.log('web-template::constructor');
  }

  connectedCallback() {
    console.log('web-template::connectedCallback');
    this.render();
  }

  private render() {
    const { shadowRoot } = this;
    shadowRoot.innerHTML = '';

    const template = document.getElementById('web-template__template') as HTMLTemplateElement;
    if (template) {
      // TODO: What is the difference between importNode and template.content.clone()?
      const instance = document.importNode(template.content, true);
      instance.querySelector('.web-template__title').innerHTML = 'Title injected from component';
      instance.querySelector('.web-template__body').innerHTML = 'Body injected from component';

      shadowRoot.appendChild(instance);
    } else {
      shadowRoot.innerHTML = '<p>Shadow Root failed. You must pass a template with id="web-template__template".</p>';
    }
  }
}

customElements.define('web-template', WebTemplateElement);

export class UseWebTemplateElement extends HTMLElement {
  connectedCallback() {
    console.log('use-web-template::connectedCallback');
    this.innerHTML = `
      <template id="web-template__template">
        <div class="web-template__title"></div>
        <div class="web-template__body"></div>
      </template>
      <web-template></web-template>
    `;
  }
}

customElements.define('use-web-template', UseWebTemplateElement);
