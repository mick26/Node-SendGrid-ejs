
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
   
          .success(function(data, status) {     
            deferred.resolve(data);
          })

          .error(function(reason, status) {
            deferred.reject("OOPS Problem Sending Email!!!" + reason);//TEST
          });

          return deferred.promise; //returns the promise
      },


      previewEmail : function(email) {
        var deferred = $q.defer();

        $http.post('/preview', email)
   
          .success(function(data, status) {     
            deferred.resolve(data);
          })

          .error(function(reason, status) {
            deferred.reject("OOPS Problem Previewing Email!!!" + reason);//TEST
          });

          //return $q.reject ("Promise Rejected !!!");//TEST
          return deferred.promise; //returns the promise
      }
    }
});