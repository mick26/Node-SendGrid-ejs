'use strict';
/*================================================
Module - for the Controllers
================================================ */
angular.module('myApp.controllers', [])


.controller('MainCtrl', function($scope, $log, emailService, $location, $sce, $rootScope, $mdDialog, $mdToast, $animate, $q) {

	/**
	 * Variables
	 */
	$scope.alert = '';
	$rootScope.inPreview = false;
	$scope.emptyFormObj = { email: {"to":'', "from":'', "subject":'', "text":''} };
	$scope.setToPristine = false;
	$scope.waitingForResponse = false;

	/**
	 * initialise values for ngMessages - error cancelled
	 */
	$scope.emailPreviewMessages = {
		"success":0,
		"fail":0
	};


	/**
	* ng Material Toast
	*/ 
	$scope.toastPosition = {
	    bottom: false,
	    top: true,
	    left: false,
	    right: true
  	};

  	$scope.showSendSuccessToast = function() {
	    $mdToast.show({
	      controller: 'ToastCtrl',
	      templateUrl: 'views/toastSendSuccess.tpl.html',
	      hideDelay: 6000,
	      position: $scope.getToastPosition()
	    });
	};

  	$scope.showSendErrorToast = function() {
	    $mdToast.show({
	      controller: 'ToastCtrl',
	      templateUrl: 'views/toastSendError.tpl.html',
	      hideDelay: 6000,
	      position: $scope.getToastPosition()
	    });
	};

	$scope.getToastPosition = function() {
    	return Object.keys($scope.toastPosition)
      		.filter(function(pos) { return $scope.toastPosition[pos]; })
      		.join(' ');
  	};


	$scope.submitEmail = function() {
		$scope.waitingForResponse = true;
		//Request
  		emailService.sendEmail($scope.email) 
		//Response Handler #1
	    .then(function(data) {
	    	$log.info("Success sending Email MMMM" + data);
			$scope.waitingForResponse = false;
			$scope.showSendSuccessToast(); //show toast message
	    },
	    function(error) {
	    	$log.error("Error sending E-mail" + error);
	    	$scope.waitingForResponse = false;
			$scope.showSendErrorToast(); //show toast message
	    });
	};


	$scope.previewEmail = function() {
		$scope.waitingForResponse = true;
		$rootScope.inPreview = true;

 		emailService.previewEmail($scope.email) 
		//Response Handler #1
	    .then(function(html) {
	    	//$log.info("Success previewing Email" + html);

	    	$scope.rawHtml = $sce.trustAsHtml(html)

/*	Works but no need for close button in template as clicking outside the modal will close it

			    '    <md-button class="md-raised md-primary" ng-click="closeDialog()">' +
			    '      Close Preview' +
			    '    </md-button>' +
*/ 


			$mdDialog.show({
			  template:
				'<md-dialog>' + 
			     $sce.trustAsHtml(html) +
			    '  <div class="md-actions">' +
			    '  </div>' +
			    '</md-dialog>',
			    controller: 'PreviewCtrl'
			})
			$scope.waitingForResponse = false;
	    },
	    function(error) {
	    	$scope.emailPreviewMessages = {"success":0, "fail": 1};
	    	$scope.waitingForResponse = false;
	    });
    };


    /**
     * Clear the Form
     * Have Issue with $setPristine()
     * Have Issues with clearing the form
     * This is a workaround but still not perfect
     * I wrapped clearForm() in a promise and then called $setPristine
     */
   	var clearForm = function() {
        var deferred = $q.defer();
      	$scope.email = { "to":"", "from":"", "subject":"", "text":""};
    	
    	deferred.resolve("Form Emptied");          
    	return deferred.promise;
    };

   	$scope.resetForm = function() {
  		clearForm()					//returns a promise
   		.then(function() {
  			$scope.emailForm.$setPristine(true);
   		})	
	};
})


/**
 * Controller - for Modal
 */
.controller('PreviewCtrl', function($scope, $mdDialog, $rootScope) {
	$rootScope.inPreview = true;
	
	$scope.closeDialog = function() {
    	// Hide most recent dialog
      	$mdDialog.hide();
      	//$mdDialog.cancel();
      	$rootScope.inPreview = false;
    };
})


/**
 * Controller - for Toast
 */
.controller('ToastCtrl', function($scope, $mdToast) {
  $scope.closeToast = function() {
    $mdToast.hide();
  };
});
