import '../modal/modal.element';

export class WebModalExElement extends HTMLElement {

  connectedCallback(): void {
    console.log('web-modal-ex::connectedCallback');
    this.render();
  }

  private render(): void {
    this.innerHTML = `
      <template id="web-modal__template">
        <style>
          .modal {
              position: absolute;
              width: 200px;
              height: 200px;
              border: 1px solid #ddd;
              background-color: #fff;
              padding: 10px;
              box-sizing: border-box;
          }
        </style>
        <div class="web-modal__title"></div>
        <div class="web-modal__content"></div>
      </template>
      <web-modal title='Original Title' content='Lorem Ipsum' />
    `;
    setTimeout(function () {
      document.getElementsByTagName('web-modal')[0].setAttribute('title', 'Endapa');
      console.log('after timeout set title');
    }, 2000)
  }
}
customElements.define('web-modal-ex', WebModalExElement);
