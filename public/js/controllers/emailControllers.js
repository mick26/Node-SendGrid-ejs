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
	$scope.emptyFormObj = { email: {"to":"aaa@fff.io", "from":"bbbb@aa.io", "subject":"", "text":""} };
	$scope.setToPristine = false;

	/**
	 * initialise values for ngMessages - error cancelled
	 */
	$scope.emailSubmitMessages = {
		"success":0,
		"fail":0
	};

	$scope.emailPreviewMessages = {
		"success":0,
		"fail":0
	};

	$scope.submitEmail = function() {
		//Request
  		emailService.sendEmail($scope.email) 
		//Response Handler #1
	    .then(function(data) {
	    	$log.info("Success sending Email" + data);
	    	$scope.emailSubmitMessages = { "success":1, "fail": 0 };	
	    },
	    function(error) {
	    	$log.error("Error sending E-mail" + error);
	    	$scope.emailSubmitMessages = {"success":0, "fail": 1};	
	    });
	    $log.info("$scope.emailPreviewMessages AAAA= "+JSON.stringify($scope.emailPreviewMessages));
	};


	$scope.previewEmail = function() {
		$rootScope.inPreview = true;

 		emailService.previewEmail($scope.email) 
		//Response Handler #1
	    .then(function(html) {
	    	//$log.info("Success previewing Email" + html);

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
			$scope.emailPreviewMessages = { "success": 1, "fail":0 };
	    },
	    function(error) {
	    	$scope.emailPreviewMessages = {"success":0, "fail": 1};
	    });
    };




   	$scope.clearForm = function() {
   		//For a future Clear button - 
   		//Can clear the form fields but have an issue with $setPristine().
		//$scope.myForm.myField.$pristine = false; 
		/*
		http://stackoverflow.com/questions/18071648/angular-js-programmatically-setting-a-form-field-to-dirty
		$scope.myForm.myField.$setViewValue(...). Looks like the answer below stating that field.
		$setDirty() was added in Angular 1.3.4 will be the better solution 
		angular.forEach($scope.form.$error.required, function(field) {
		    field.$setDirty();
		});
		*/
		// if($scope.emailForm.$pristine == true) {
			// $scope.emailForm = angular.copy($scope.emptyFormObj);
			// angular.forEach($scope.emailForm.$error, function(field) {
		 //    	field.$setDirty();
			// });
	}
})


/**
 * Controller - for Modal
 */
.controller('PreviewCtrl', function($scope, $mdDialog, $rootScope) {
	$rootScope.inPreview = true;
	$scope.closeDialog = function() {
    	// Hide most recent dialog
      	$mdDialog.hide();
      	$rootScope.inPreview = false;
    };
});
