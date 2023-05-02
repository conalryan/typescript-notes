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
    const triggerBottom = window.innerHeight / 5 * 4; // / 5 * 4 in order to be able to see them leave while scrolling up
    this.boxes.forEach(box => {
      const boxTop = box.getBoundingClientRect().top;
      const text = box.querySelector('h2').innerText;
      console.log('box', text, window.innerHeight, boxTop, triggerBottom);
      if (boxTop < triggerBottom) {
        box.classList.add('show');
      } else {
        box.classList.remove('show');
      }

    //   const text = box.querySelector('h2').innerText;
    //   console.log('box', text, window.innerHeight, box.getBoundingClientRect(), triggerBottom);
    //   const { top, bottom } = box.getBoundingClientRect();
    //   const topInView = top > 0 && top < window.innerHeight;
    //   const bottomInView = bottom > 0 && bottom < window.innerHeight;

    //   // alternative: have elements remove and add as you scroll up and down
    //   if (topInView && bottomInView) {
    //     box.classList.add('show');
    //   } else {
    //     box.classList.remove('show');
    //   }
    });
  }

  private query(): void {
    this.boxes = document.querySelectorAll('.scroll-animation__box');
  }

  private render(): void {
    this.innerHTML = `
      <h1>Scroll to see the animation</h1>
      <div class="scroll-animation__box"><h2>Content A</h2></div>
      <div class="scroll-animation__box"><h2>Content B</h2></div>
      <div class="scroll-animation__box"><h2>Content C</h2></div>
      <div class="scroll-animation__box"><h2>Content D</h2></div>
      <div class="scroll-animation__box"><h2>Content E</h2></div>
      <div class="scroll-animation__box"><h2>Content F</h2></div>
      <div class="scroll-animation__box"><h2>Content G</h2></div>
      <div class="scroll-animation__box"><h2>Content H</h2></div>
      <div class="scroll-animation__box"><h2>Content I</h2></div>
      <div class="scroll-animation__box"><h2>Content J</h2></div>
      <div class="scroll-animation__box"><h2>Content K</h2></div>
      <div class="scroll-animation__box"><h2>Content L</h2></div>
      <div class="scroll-animation__box"><h2>Content M</h2></div>
    `;
  }
}
customElements.define('scroll-animation', ScrollAnimationElement);
