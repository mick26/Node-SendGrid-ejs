/*
Ref.
Promise Output:
promise.$$state.status === 0 // pending
promise.$$state.status === 1 // resolved
promise.$$state.status === 2 // rejected
*/

'use strict';
/*================================================
Module - for Services
================================================ */
angular.module('myApp.emailServices', [])

.service('emailService', function($http, $q) {

    return {

      sendEmail : function(email) {
        var deferred = $q.defer();

        $http.post('/email', email)
   
          .success(function(data) {    
            //$log.debug("RESOLVE: "+ data + status); //TEST
            deferred.resolve(data);
          })

          .error(function(reason) {
            deferred.reject("OOPS Problem Sending Email!!!" + reason);
            //$log.debug("REJECT: "+ reason + status); //TEST
          });

          return deferred.promise; //returns the promise
      },



      previewEmail : function(email) {
        var deferred = $q.defer();

        $http.post('/preview', email)
   
          .success(function(data) {     
            deferred.resolve(data);
          })

          .error(function(reason) {
            deferred.reject("OOPS Problem Previewing Email!!!" + reason);//TEST
          });

          //return $q.reject ("Promise Rejected !!!");//TEST
          return deferred.promise; //returns the promise
      }

    };
});