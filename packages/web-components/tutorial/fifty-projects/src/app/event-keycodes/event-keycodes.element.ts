import './event-keycodes.scss';

export class EventKeycodesElement extends HTMLElement {

  container: HTMLElement;

  connectedCallback() {
    this.render();
    this.query();
    this.listen();
  }

  private render(): void {
    this.innerHTML = `
      <div class="event-keycodes__container">
        <div class="key">
          Press any key to get the keyCode
        </div>
      </div>
    `;
  }

  private query(): void {
    this.container = document.querySelector('.event-keycodes__container');
    console.log('query::container', this.container);
  }

  private listen(): void {
    // 'click' 'keyup' fails 'keydown'
    window.addEventListener('keydown', (event: KeyboardEvent) => {
      console.log('event-keycodes-element::listen container', event);
      this.container.innerHTML = `
        <div class="key">
          ${event.key === ' ' ? 'Space' : event.key}
          <small>event.key</small>
        </div>

        <div class="key">
          ${event.keyCode}
          <small>event.keyCode</small>
        </div>

        <div class="key">
          ${event.code}
          <small>event.code</small>
        </div>
      `;
    });
    console.log('listen::container', this.container);
  }
}
customElements.define('event-keycodes', EventKeycodesElement);
