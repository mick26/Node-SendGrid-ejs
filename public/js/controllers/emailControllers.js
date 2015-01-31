'use strict';
/*================================================
Module - for the Controllers
================================================ */
angular.module('myApp.controllers', [])


.controller('MainCtrl', function($scope, $log, emailService, $location, $sce, $rootScope, $mdDialog) {

	/**
	 * Variables
	 */
	$scope.alert = '';
	$rootScope.inPreview = false;


	/**
	 * initialise values for ngMessages - error cancelled
	 */
	$scope.emailSubmitMessages = {
		alert:false,
		fail:false
	};

	$scope.emailPreviewMessages = {
		alert:false,
		fail:false
	};



	$scope.submitEmail = function() {
		//Request
  		emailService.sendEmail($scope.email) 
		//Response Handler #1
	    .then(function(data) {
	    	$log.info("Success sending Email" + data);
	    	$scope.emailSubmitMessages.alert = true;
	    },
	    function(error) {
	    	$log.error("Error sending E-mail" + error);
	    	$scope.emailSubmitMessages.fail = true;				
	    });

	    return emailService;
	};


	$scope.previewEmail = function(ev) {
		$rootScope.inPreview = true;

 		emailService.previewEmail($scope.email) 
		//Response Handler #1
	    .then(function(html) {
	    	//$log.info("Success previewing Email" + html);
	    	$scope.emailPreviewMessages.alert = true;
	    	$scope.rawHtml = $sce.trustAsHtml(html)

			$mdDialog.show({
			  template:
				'<md-dialog>' + 
			     $sce.trustAsHtml(html) +
			    '  <div class="md-actions">' +
			    '    <md-button class="md-raised md-primary" ng-click="closeDialog()">' +
			    '      Close Preview' +
			    '    </md-button>' +
			    '  </div>' +
			    '</md-dialog>',
			    controller: 'PreviewCtrl'
			})
	    },
	    function(error) {
	    	//$log.error("Error previewing E-mail" + error);
	    	$scope.emailPreviewMessages.fail = true;
	    });

	     return emailService;

    };
})


/**
 * Controller - for Modal
 */
.controller('PreviewCtrl', function($scope, $mdDialog, $rootScope) {
	$rootScope.inPreview = true;
	$scope.closeDialog = function() {
    	// Easily hides most recent dialog shown...
      	// no specific instance reference is needed.
      	$mdDialog.hide();
      	$rootScope.inPreview = false;
    };
});
