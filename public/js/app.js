'use strict';

/*================================================================
Module - Main App Module
=================================================================*/
angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngAnimate', 'ngSanitize', 'myApp.controllers', 
	'ngMessages', 'myApp.emailServices'])

/**
 * Angular Material Themes to use
 */
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default');
  $mdThemingProvider.theme('blue');
})



.config(function ($routeProvider, $locationProvider, $httpProvider) {

    /*================================================
    Define all the Routes
    ================================================ */
    $routeProvider

      .when('/', {
        templateUrl: '/views/main.tpl.html',
        controller: 'MainCtrl',
        resolve: {
          app: function($q, $timeout) {
              var defer = $q.defer();
              $timeout(function() {
                  defer.resolve();
              }, 2000);
              return defer.promise;
          }
        }
      })
      
      .otherwise({
        redirectTo: '/'
      })
});

