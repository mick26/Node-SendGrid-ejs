'use strict';

/*================================================================
Module - for Routes
=================================================================*/
angular.module('myApp.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

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
      });

      $locationProvider.html5Mode(true);
});
