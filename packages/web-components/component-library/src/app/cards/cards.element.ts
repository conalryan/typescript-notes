import '../card/card.element';

export class WebCardsElement extends HTMLElement {
  private titles = [
    {title: 'The Five Orange Pips', subtitle: 'A delivery of innocous letter followed by death.', cover: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Sherlock_Holmes_in_The_Five_Orange_Pips.jpg'},
    {title: 'A Study in Scarlet', subtitle: 'Dr. John Watson meets Mr. Sherlock Holmes.', cover: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/A_study_in_scarlet%2C_Plate_1.png/640px-A_study_in_scarlet%2C_Plate_1.png'},
    {title: 'The Hound of the Baskervilles', subtitle: 'A mysterious hound terrifies a town.', cover: 'https://www.oldbookillustrations.com/wp-content/uploads/2018/11/hound-baskervilles.jpg'}
  ]

  connectedCallback() {
    console.log('web-cards::connectedCallback');

    this.innerHTML = `
      <template id='web-card__template'>
        <style>
          .web-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            border: 1px solid #ddd;
            width: 80%;
            /* padding: 10px; */
            height: 400px;
            box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
            background-color: #fff;
            justify-content: space-evenly;
            border-radius: 10px;
          }
          .web-card__header {
            height: 300px;
            /* padding: 10px; */
            width: 100%;
            border-bottom: 1px solid #ddd;
          }
          .web-card__content {
            box-sizing: border-box;
            width: 100%;
            margin: 0;
            padding: 0 10px;
          }
          .web-card__cover {
            height: 100%;
            /* max-width: 200px; */
            width: 100%;
            /* max-width: 100%;
            max-height: 100%;
            display: block; */
            object-fit: cover;
          }
          .web-card__title {
            margin: 0;
            font-size: 20px;
          }
          .web-card__subtitle {
            color: #666;
            font-size: 15px;
          }
        </style>

        <div class='web-card'>
          <div class='web-card__header'>
            <img class='web-card__cover' src='' />
          </div>
          <div class='web-card__content'>
            <p class='web-card__title'></p>
            <span class='web-card__subtitle'></span>
            <!-- <span class='web-card__synopsis'></span> -->
          </div>
        </div>
      </template>

      <!-- <web-card /> -->
      <div id="web-cards-container"></div>
    `;

    this.titles.forEach(title => {
      const node = document.createElement('web-card')
      node.setAttribute('title', title.title);
      node.setAttribute('subtitle', title.subtitle)
      node.setAttribute('cover', title.cover);
      // document.getElementById('blog-cards-container').appendChild(`<blog-card title="${title.title}" subtitle="${title.subtitle}" cover="${title.cover}"></blog-card>`)
      document.getElementById('web-cards-container').appendChild(node);
    });
  }
}
customElements.define('web-cards', WebCardsElement);
