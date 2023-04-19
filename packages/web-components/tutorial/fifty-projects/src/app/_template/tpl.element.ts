import './tpl.scss';

export class TplElement extends HTMLElement {

  container: HTMLElement;

  connectedCallback() {
    this.render();
    this.query();
    this.listen();
  }

  private render(): void {
    this.innerHTML = `
      <div class="tpl__container">
        <p>Tpl Element works!</p>
      </div>
    `;
  }

  private query(): void {
    this.container = document.querySelector('.tpl__container');
  }

  private listen(): void {
    this.container.addEventListener('keyup', $event => {
      console.log('tpl-element::listen container', $event);
    });
  }
}
customElements.define('tpl', TplElement);
