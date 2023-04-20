import './center-items-block.scss';

export class CenterItemsBlockElement extends HTMLElement {

  container: HTMLElement;

  connectedCallback() {
    this.render();
  }

  private render(): void {
    this.innerHTML = `
      <div class="center-items-block__container">
        <div class="center">
          <div class="child">One</div>
          <div class="child">Two</div>
          <div class="child">Three</div>
        </div>
      </div>
    `;
  }
}
customElements.define('center-items-block', CenterItemsBlockElement);
