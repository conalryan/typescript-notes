import angular from 'angular';

import './app.css';

angular.module('appjs', [])
  .controller('MainCtrl', function() {
    this.message = 'Hello world from AngularJS';
  });