import { Component, Prop, h } from '@stencil/core';
import { format } from '../../utils/utils';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.scss',
  shadow: true
})
export class MyComponent {
  /**
   * The first name
   */
  @Prop() first: string;

  /**
   * The middle name
   */
  @Prop() middle: string;

  /**
   * The last name
   */
  @Prop() last: string;

  value = 'hello from my comp';

  handleModelChange(event) {
    console.log('handling model change', event);
  }

  private getText(): string {
    return format(this.first, this.middle, this.last);
  }

  render() {
    return <div class="test">
      Hello, World! I'm {this.getText()}

      <st-text-field value={this.value} onModelChange={ev => this.handleModelChange(ev)}></st-text-field>

    </div>;
  }
}
