'use strict';

/*================================================================
Module - Main App Module
=================================================================*/
angular.module('myApp', ['myApp.routes', 'ngMaterial', 'ngAnimate', 'ngSanitize', 'myApp.controllers', 
	'ngMessages', 'myApp.emailServices'])

/**
 * Angular Material Themes to use
 */
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default');
  $mdThemingProvider.theme('blue');
});


