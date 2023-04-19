import './scroll-animation.scss';

export class ScrollAnimationElement extends HTMLElement {

  boxes: NodeListOf<Element>;

  connectedCallback() {
    this.render();
    this.query();
    this.listen();
    this.onScroll();
  }

  private listen(): void {
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  private onScroll(): void {
    const triggerBottom = window.innerHeight / 5 * 4;
    this.boxes.forEach(box => {
      const boxTop = box.getBoundingClientRect().top;
      if (boxTop < triggerBottom) {
        box.classList.add('show');
      } else {
        box.classList.remove('show');
      }
    });
  }

  private query(): void {
    this.boxes = document.querySelectorAll('.scroll-animation__box');
  }

  private render(): void {
    this.innerHTML = `
      <h1>Scroll to see the animation</h1>
      <div class="scroll-animation__box"><h2>Content</h2></div>
      <div class="scroll-animation__box"><h2>Content</h2></div>
      <div class="scroll-animation__box"><h2>Content</h2></div>
      <div class="scroll-animation__box"><h2>Content</h2></div>
      <div class="scroll-animation__box"><h2>Content</h2></div>
      <div class="scroll-animation__box"><h2>Content</h2></div>
      <div class="scroll-animation__box"><h2>Content</h2></div>
      <div class="scroll-animation__box"><h2>Content</h2></div>
      <div class="scroll-animation__box"><h2>Content</h2></div>
      <div class="scroll-animation__box"><h2>Content</h2></div>
      <div class="scroll-animation__box"><h2>Content</h2></div>
      <div class="scroll-animation__box"><h2>Content</h2></div>
      <div class="scroll-animation__box"><h2>Content</h2></div>
    `;
  }
}
customElements.define('scroll-animation', ScrollAnimationElement);
