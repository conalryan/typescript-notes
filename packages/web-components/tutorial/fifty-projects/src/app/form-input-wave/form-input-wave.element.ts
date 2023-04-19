import './form-input-wave.scss';

export class FormInputWaveElement extends HTMLElement {

  labels: NodeListOf<HTMLLabelElement>;

  connectedCallback() {
    this.render();
    this.query();
    this.formatLabels();
  }

  private render(): void {
    this.innerHTML = `
      <div class="form-input-wave__container">
        <h1>Please Login</h1>
        <form>
          <div class="form-control">
            <input type="text" required>
            <label>Email</label>
            <!-- <label>
              <span style="transition-delay: 0ms">E</span>
                <span style="transition-delay: 50ms">m</span>
                <span style="transition-delay: 100ms">a</span>
                <span style="transition-delay: 150ms">i</span>
                <span style="transition-delay: 200ms">l</span>
          </label> -->
          </div>

          <div class="form-control">
            <input type="password" required>
            <label>Password</label>
          </div>

          <button class="btn">Login</button>

          <p class="text">Don't have an account? <a href="#">Register</a> </p>
        </form>
      </div>
    `
  }

  private query(): void {
    this.labels = document.querySelectorAll('label');
  }

  private formatLabels(): void {
    this.labels.forEach((label, idx) => {
      label.innerHTML = label.innerText.split('')
        .map((letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`)
        .join('');
    })
  }
}
customElements.define('form-input-wave', FormInputWaveElement);
