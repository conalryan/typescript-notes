import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'st-text-field',
  styleUrl: 'st-text-field.scss',
  shadow: true,
})
export class StTextField {

  @Prop() readonly: boolean;

  @Prop() value: string;

  @Event() modelChange: EventEmitter<string>;

  handleChange(event) {
    this.value = event.target.value;
    console.log('handleChange', event);
    this.modelChange.emit(this.value);
  }

  render() {
    return (
      <Host>

        {this.readonly &&  <span class="readonly-container">{this.value}</span>}

        <input hidden={this.readonly} type="text" value={this.value} onInput={(event) => this.handleChange(event)} />
      </Host>
    );
  }

}
