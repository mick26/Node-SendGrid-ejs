// Karma configuration
// Generated on Mon Feb 09 2015 14:42:11 GMT+0000 (GMT Standard Time)
//
//https://github.com/angular/angular-seed/blob/master/karma.conf.js
//
//
module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    //basePath : './',
    //basePath: '..\..',
    basePath : '../..',



    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        // JASMINE,
        // JASMINE_ADAPTER,
        'lib/angular/angular.js',
        'lib/angular-route/angular-route.js',
        'lib/angular-sanitize/angular-sanitize.js',
        'lib/angular-mocks/angular-mocks.js',
        'src/js/app.js',
        'src/js/appRoutes.js',
        'src/js/controllers/emailControllers.js',
        'src/js/services/emailServices.js',
        'src/js/**/*.js',
        'test/unit/app.spec.js',
        'test/unit/controllers/emailControllers.spec.js'
    ],


    // list of files to exclude
    exclude: [
        'test/unit/services/emailServices.spec.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    //browsers: ['Chrome', 'Firefox'],
    //PhantomJS
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
