/* ==============================================================
Unit Testing - Controllers
=============================================================== */
'use strict';


/**
 * Test if Controllers defined in controllers module Exist
 */
describe("Unit: Testing Controllers", function () {

  	var controllersModule;
    beforeEach(function () {
        controllersModule = angular.module('myApp.controllers');
    });

    it('MainCtrl should exist', function () {
        expect(controllersModule.controller('MainCtrl')).toBeDefined();
    });

    it('PreviewCtrl should exist', function () {
        expect(controllersModule.controller('PreviewCtrl')).toBeDefined();
    });

    it('ToastCtrl should exist', function () {
        expect(controllersModule.controller('ToastCtrl')).toBeDefined();
    });

});
