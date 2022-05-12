import * as angular from 'angular';
import menu from './menu';
import './app.css';

angular.module('appjs', [
  menu.name,
])
  .config(config)
  .controller('MainCtrl', function() {
    this.message = 'Hello world from AngularJS';
  });

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

angular.bootstrap(document.body, ['appjs'], { strictDi: true });
