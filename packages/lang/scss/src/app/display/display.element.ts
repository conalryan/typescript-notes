import './display.scss';

export class DisplayElement extends HTMLElement {

  container: HTMLElement;

  connectedCallback() {
    this.render();
    this.query();
    this.listen();
  }

  private render(): void {
    this.innerHTML = `
      <div class="display__container">
        <div class="display__target">
          <div class="child">One</div>
          <div class="child">Two</div>
          <div class="child">Three</div>
        </div>
      </div>
    `;
  }

  private query(): void {
    this.container = document.querySelector('.display__container');
  }

  private listen(): void {
    // addEventListener...
  }
}
customElements.define('scss-display', DisplayElement);
