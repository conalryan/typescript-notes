import angular from"angular";import menu from"./menu";import"./app.css";function config(){}angular.module("appjs",[menu.name]).config(config).controller("MainCtrl",(function(){this.message="Hello world from AngularJS"})),config.$inject=[],angular.bootstrap(document.body,["appjs"],{strictDi:!0});