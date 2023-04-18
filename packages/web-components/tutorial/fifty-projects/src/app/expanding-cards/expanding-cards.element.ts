import './expanding-cards.scss';

export class ExpandingCards extends HTMLElement {

  connectedCallback() {
    this.render();
    this.listen();
  }

  private render(): void {
    this.innerHTML = `
      <div class="expanding-cards__container">
        <div class="expanding-cards-panel active" style="background-image: url('https://images.unsplash.com/photo-1558979158-65a1eaa08691?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')">
          <h3>Explore The World</h3>
        </div>

        <div class="expanding-cards__panel" style="background-image: url('https://images.unsplash.com/photo-1572276596237-5db2c3e16c5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')">
          <h3>Wild Forest</h3>
        </div>

        <div class="expanding-cards__panel" style="background-image: url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80')">
          <h3>Sunny Beach</h3>
        </div>

        <div class="expanding-cards__panel" style="background-image: url('https://images.unsplash.com/photo-1551009175-8a68da93d5f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80')">
          <h3>City on Winter</h3>
        </div>

        <div class="expanding-cards__panel" style="background-image: url('https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')">
          <h3>Mountains - Clouds</h3>
        </div>
      </div>
    `;
  }

  private listen(): void {
    const panels = document.querySelectorAll('.expanding-cards-panel');
    console.log('expanding-cards::listen ', panels);
    panels.forEach(panel => {
      panel.addEventListener('click', ($event) => this.handleClick(panels, panel));
    });
  }

  private handleClick(panels: NodeListOf<Element>, panel: Element): void {
    console.log('expanding-cards::handleClick ', panel);
    panels.forEach(p => {
      if (p !== panel) {
        p.classList.remove('active');
      } else {
        p.classList.add('active');
      }
    });
  }
}
customElements.define('expanding-cards', ExpandingCards);
