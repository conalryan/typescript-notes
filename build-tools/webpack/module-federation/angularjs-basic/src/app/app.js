import angular from 'angular';

angular
  .module('angularjs-basic', [])
  .component('helloComponent', {
    controller: function () {
      this.message = 'AngularJS';
      this.version = require('../../package.json').dependencies.angular;
    },
    template: `
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
      <h1>
        {{$ctrl.message}}
        <img src="https://angular.io/assets/images/logos/angularjs/AngularJS-Shield.svg" height="30">
      </h1>
      <p>
        AngularJS Version: {{$ctrl.version}}
      </p>
      <button class="btn btn-primary">a button</button>
    `
  }
);

// Note: You can also wrap a controller or a directive
// in a Custom Element!

export class MfeAngularJs extends HTMLElement {
  connectedCallback() {
    const root = document.createElement('hello-component');
    this.appendChild(root);
    angular.bootstrap(root, ['angularjs-basic']);
  }
}

customElements.define('angularjs-basic-element', MfeAngularJs);
