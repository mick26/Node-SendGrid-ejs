/* ==============================================================
Unit Testing - Services

https://docs.angularjs.org/api/ng/service/$q
http://www.sitepoint.com/mocking-dependencies-angularjs-tests/
http://tech.pro/tutorial/1515/you-got-http-in-my-angularjs-unit-tests
https://docs.angularjs.org/api/ngMock/service/$httpBackend

$httpBackend.whenPOST() 
Creates a new back-end definition for POST requests. 
It accepts three arguments:
• url - an HTTP URL
• data - (optional) an HTTP request body or a function that receives the data
• headers - (optional) HTTP headers

$httpBackend.expect - specifies a request expectation
$httpBackend.when - specifies a backend definition
=============================================================== */
'use strict';

/**
 * Test if Services defined in emailServices module Exist
 */
describe("Unit: Test emailService", function () {

	/**
	 * Load the module containing the service
	 */
	beforeEach(module('myApp.emailServices'));

	/**
	 * Variables
	 */
	var service; 			
	var $httpBackend;

	/**
	 * Data to send in test $http post
	 */
	var email_mock = { 
    	"to":'kitty@aaa.ie', 
    	"from":'mick@aaa.ie', 
		"subject":'Mock Subject', 
		"text":'This is a Mock Email'
	}; 


	/**
	 * Init service
	 */
    beforeEach(inject(function(emailService, _$httpBackend_) {
    	service = emailService;
    	$httpBackend = _$httpBackend_;
    }));
	
	describe("unit: Test sendEmail method", function() {

		it("should make $http post call to /email", function() {
			/**
			 * Set the test response to $http.post('/email', email_mock)
			 */
			$httpBackend.whenPOST("/email", email_mock).respond(200, "emailSuccess");

			//call the sendMail method of service
			var promise = service.sendEmail(email_mock);
			var promiseResponse = null; //will get assigned promise response

			promise.then(function(response) {
				promiseResponse = response;	
			});

			$httpBackend.flush();	//Force a response from post
			
			//console.log("The post('/email', ) promiseResponse= "+promiseResponse);
			expect(promiseResponse).toBeTruthy();	
			expect(promiseResponse).toBe("emailSuccess");	
		});
	});



	describe("unit: Test sendPreview method", function() {

		it("should make $http post call to /preview", function() {
			/**
			 * Set the test response to $http.post('/email', email_mock)
			 */
			$httpBackend.whenPOST("/preview", email_mock).respond(200, "previewSuccess");

			//call the sendMail method of service
			var promise = service.previewEmail(email_mock);
			var promiseResponse = null; //will get assigned promise response

			promise.then(function(response) {
				promiseResponse = response;	
			});

			$httpBackend.flush();	//Force a response from post
			
			//console.log("The post('/email', ) promiseResponse= "+promiseResponse);
			expect(promiseResponse).toBeTruthy();	
			expect(promiseResponse).toBe("previewSuccess");	
		});
	});

});
