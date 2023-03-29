import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'app-text-field',
  styleUrl: 'app-text-field.css',
  shadow: true,
})
export class AppTextField {

  render() {
    return (
      <Host>
        <h1>app-text-field-works</h1>
        <my-component></my-component>
        <slot></slot>
      </Host>
    );
  }

}
