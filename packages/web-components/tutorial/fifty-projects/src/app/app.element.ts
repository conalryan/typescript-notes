import './app.element.scss';
import './expanding-cards/expanding-cards.element';
import './progress-steps/progress-steps.element';
import './rotating-navigation/rotating-navigation.element';
import './hidden-search/hidden-search.element';
import './blurry-loading/blurry-loading.element';

export class AppElement extends HTMLElement {
  public static observedAttributes = [];

  connectedCallback() {
    this.innerHTML = `
      <!-- <expanding-cards /> -->

      <!-- <progress-steps /> -->

      <!-- <rotating-navigation /> -->

      <!-- <hidden-search /> -->

      <blurry-loading />
    `;
  }
}
customElements.define('fifty-projects-root', AppElement);
