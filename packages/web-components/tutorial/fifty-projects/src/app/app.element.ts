import './app.element.scss';
import './expanding-cards/expanding-cards.element';
import './progress-steps/progress-steps.element';
import './rotating-navigation/rotating-navigation.element';

export class AppElement extends HTMLElement {
  public static observedAttributes = [];

  connectedCallback() {
    this.innerHTML = `
      <!-- <expanding-cards /> -->

      <!-- <progress-steps /> -->

      <rotating-navigation />
    `;
  }
}
customElements.define('fifty-projects-root', AppElement);
