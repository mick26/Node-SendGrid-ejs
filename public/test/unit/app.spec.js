/* ==============================================================
Unit Testing

Tests related to app.js file
Tests that Angular exists in the App
Tests that the Main App Module exists
Tests that other Modules we created and injected in to the Main App module exist 
=============================================================== */
'use strict';

/**
 * Test if Angular Exists
 */
describe("Angular", function () {

    it("should exist", function () {
        expect(window.angular).toBeDefined();
    });
});


/**
 * Test if the Main App Module myApp Exists
 */
describe("Main App module: myApp", function () {
    var mainModule;
    beforeEach(function () {
        mainModule = angular.module('myApp');
    });

    it("should exist", function () {
        expect(mainModule).toBeDefined();
    });
});


/**
 * Test if Routes Module myApp.routes Exists
 */
describe("Routes module: myApp.routes", function () {
    
    var routesModule;
    beforeEach(function () {
        routesModule = angular.module('myApp.routes');
    });

    it("should exist", function () {
        expect(routesModule).toBeDefined();
    });
});


/**
 * Test if Controllers Module myApp.controllers Exists
 */
describe("Controllers module: myApp.controllers", function () {
    
    var controllersModule;
    beforeEach(function () {
        controllersModule = angular.module('myApp.controllers');
    });

    it("should exist", function () {
        expect(controllersModule).toBeDefined();
    });
});



/**
 * Test if Services Module myApp.services Exists
 */
describe("Services module: myApp.emailServices", function () {
    
    var emailServicesModule;
    beforeEach(function () {
        emailServicesModule = angular.module('myApp.emailServices');
    });

    it("should exist", function () {
        expect(emailServicesModule).toBeDefined();
    });
});

