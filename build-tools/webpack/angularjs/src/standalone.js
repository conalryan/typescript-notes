import angular from 'angular';
import menu from './menu';

angular.module('appjs.standalone', [
  menu.name,
])
  .config(config);

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