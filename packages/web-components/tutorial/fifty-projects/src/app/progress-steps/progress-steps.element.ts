import './progress-steps.scss';

export class ProgressStepsElement extends HTMLElement {

  activeIndex = 1;
  circles: NodeListOf<Element>;
  next: Element;
  prev: Element;
  progress: HTMLElement;

  connectedCallback() {
    this.render();
    this.listen();
  }

  private render(): void {
    this.innerHTML = `
      <div class="progress-steps">
        <div class="progress-steps__container">
          <div class="progress-steps__progress" id="progress"></div>
          <div class="progress-steps__circle active">1</div>
          <div class="progress-steps__circle">2</div>
          <div class="progress-steps__circle">3</div>
          <div class="progress-steps__circle">4</div>
        </div>

        <button class="progress-steps__btn" id="prev" disabled>Prev</button>
        <button class="progress-steps__btn" id="next">Next</button>
      </div>
    `;

    this.circles = document.querySelectorAll('.progress-steps__circle');
    this.prev = document.querySelector('#prev');
    this.next = document.querySelector('#next');
    this.progress = document.querySelector('#progress') as HTMLElement;
  }

  private listen(): void {
    this.prev.addEventListener('click', ($event) => {
      if (this.activeIndex > 1) {
        this.circles[this.activeIndex -1].classList.remove('active');
        this.activeIndex--;
        this.circles[this.activeIndex -1].classList.add('active');
        this.progress.style.width = (this.activeIndex - 1) / (this.circles.length - 1) * 100 + '%';
      }
      if (this.activeIndex <= 1) {
       this.prev.setAttribute('disabled', 'true');
      }
      console.log('prev', this.activeIndex);
    });

    this.next.addEventListener('click', ($event) => {
      if (this.activeIndex < this.circles.length) {
        this.circles[this.activeIndex -1].classList.remove('active');
        this.activeIndex++;
        this.circles[this.activeIndex -1].classList.add('active');
        this.progress.style.width = (this.activeIndex - 1) / (this.circles.length - 1) * 100 + '%';
      }
      if (this.activeIndex > 1) {
       this.prev.removeAttribute('disabled');
      }
      console.log('next', this.activeIndex);
    });
  }
}
customElements.define('progress-steps', ProgressStepsElement);
