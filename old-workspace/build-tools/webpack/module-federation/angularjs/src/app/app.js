import angular from 'angular';
import menu from './menu';
import './app.css';

angular.module('appjs', [
  menu.name,
])
  .config(config)
  .controller('MainCtrl', function() {
    this.message = 'Hello world from AngularJS';
  },
  template: `
    <appjs-menu-header></appjs-menu-header>
    <div id="message" ng-controller="MainCtrl as mainCtrl">
      {{ mainCtrl.message }}
    </div>
    <img src="./assets/webpack.svg" />
  `);

function config() {
  // $provide.decorator('$browser', [ '$delegate', $browser => {
  //   // this is a hack that will disable location tracking for AngularJS. This assumes that all consumers of this module are purely
  //   // Angular 11+ apps and have NO AngularJS dependencies. The menu also does not depend upon the $location service (group context is
  //   // broken in this mode and has to be handled using services in ng-akamai-core).
  //   $browser.onUrlChange = () => undefined;
  //   return $browser;
  // }]);
}
config.$inject = [];

// angular.bootstrap(document.body, ['appjs'], { strictDi: true });

// Note: You can also wrap a controller or a directive 
// in a Custom Element!

export class MfeAngularJs extends HTMLElement {
  connectedCallback() {
    const root = document.createElement('angularjs-component');
    this.appendChild(root);
    angular.bootstrap(root, ['appjs']);
  }
}

customElements.define('angularjs-element', MfeAngularJs);

