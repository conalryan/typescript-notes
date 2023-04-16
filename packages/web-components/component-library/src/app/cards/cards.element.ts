import '../card/card.element';

export class WebCardsElement extends HTMLElement {

  connectedCallback() {
    this.innerHTML = `
      <template id='web-card-template'>
        <style>
            .web-card {
                border: 1px solid #ddd;
                width: 200px;
                padding: 10px;
            }

            .web-card__header {
                padding: 10px;
                border-bottom: 1px solid #ddd;
            }

            .web-card__content {
                margin-top: 10px;
            }
        </style>
        <div class='web-card'>
            <div class='web-card__header'>
                <p class='web-card__title'></p>
                <span class='web-card__subtitle'></span>
            </div>
            <div class='web-card__content'>
                <span class='web-card__synopsis'></span>
            </div>
        </div>
      </template>
      <web-card />
    `;
  }
}

customElements.define('web-cards', WebCardsElement);
