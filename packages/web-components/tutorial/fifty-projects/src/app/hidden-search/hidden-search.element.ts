import './hidden-search.scss';

export class HiddenSearchElement extends HTMLElement {

  isOpen = false;

  connectedCallback() {
    this.render();
    this.listen();
  }

  private render(): void {
    this.innerHTML = `
      <div class="hidden-search__container">
        <input type="text" class="hidden-search__input" placeholder="Search...">
        <button class="btn">
          <i class="fas fa-search"></i>
        </button>
      </div>
    `;
  }

  private listen(): void {
    const container = document.querySelector('.hidden-search__container');
    const btn = document.querySelector('.btn');
    btn.addEventListener('click', () => {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        container.classList.add('active');
      } else {
        container.classList.remove('active');
      }
    })
  }
}
customElements.define('hidden-search', HiddenSearchElement);
