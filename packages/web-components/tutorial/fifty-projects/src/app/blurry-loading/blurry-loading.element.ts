import './blurry-loading.scss';

export class BlurryLoadingElement extends HTMLElement {

  container: HTMLElement;
  loading;
  load = 0;
  text: HTMLElement;

  connectedCallback() {
    this.render();
    this.query();
    this.loading = setInterval(this.blurFn.bind(this), 30);
  }

  private blurFn(): void {
    if (this.load > 99) {
      clearInterval(this.loading);
    }
    this.load++;

    this.text.innerText = `${this.load}%`
    this.text.style.opacity = this.scale(this.load, 0, 100, 1, 0)
    this.container.style.filter = `blur(${this.scale(this.load, 0, 100, 30, 0)}px)`
  }

  // https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
  private scale = (num, in_min, in_max, out_min, out_max) => {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
  }

  private query(): void {
    this.container = document.querySelector('.blurry-loading__container');
    this.text = document.querySelector('.blurry-loading__loading-text');
  }

  private render(): void {
    this.innerHTML = `
      <section class="blurry-loading__container"></section>
      <div class="blurry-loading__loading-text">0%</div>
    `;
  }
}
customElements.define('blurry-loading', BlurryLoadingElement);
