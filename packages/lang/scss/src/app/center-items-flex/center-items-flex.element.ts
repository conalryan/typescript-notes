import './center-items-flex.scss';

export class CenterItemsFlexElement extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="center-items-flex__container">
        <div class="child">One</div>
        <div class="child">Two</div>
        <div class="child">Three</div>
      </div>
    `;
  }
}
customElements.define('center-items-flex', CenterItemsFlexElement);
