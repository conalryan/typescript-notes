import angular from 'angular';
import menu from './menu';
import './app.css';

angular
  .module('appjs', [
    menu.name,
  ])
  .controller('MainCtrl', function() {
    this.message = 'Hello world from AngularJS';
  })
  .bootstrap(document.body, ['appjs'], { strictDi: true });
