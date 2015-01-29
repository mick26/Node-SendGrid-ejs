/* ========================================================== 
Michael Cullen
2015

Ref.
https://github.com/tj/ejs/blob/master/examples/list.js
https://scotch.io/tutorials/use-ejs-to-template-your-node-application
http://jsperf.com/precompiled-hogan-handlebars-ejs
https://www.youtube.com/watch?v=FrB8mxdWR7o
https://www.npmjs.com/package/sendgrid
https://www.npmjs.com/package/dotenv
https://sendgrid.com/docs/index.html
https://github.com/sendgrid/sendgrid-nodejs-example
https://sendgrid.com/blog/sendgrid-brings-email-deliverability-ibm-cloud-marketplace/
============================================================ */
'use strict';

/* ========================================================== 
External Modules/Packages Required
============================================================ */
var express = require('express');
var logger   = require('morgan'); //logger middleware
var path = require('path');
var http = require('http');
var colours = require('colors');
var http = require('http');

/* ========================================================== 
Internal App Modules/Packages Required
============================================================ */
var routes = require('./server/routes.js'); //Exchange routes


/* ========================================================== 
Create a new application with Express
============================================================ */
var app = express();

/* ========================================================== 
Set the Port
============================================================ */
app.set('port', process.env.PORT || 8800);

/**
 * Set the view engine to ejs
 */
app.set('view engine', 'ejs');

/**
 * Set path to /views (where ejs templates are)
 */
app.set("views", "./server/views"); 

/*
 * log every request to the console
 */
app.use(logger('dev')); 			

/* ========================================================== 
authRoutes - using Express
============================================================ */
routes(app);

/* ========================================================== 
Create HTTP Server using Express
============================================================ */
var server = http.createServer(app);

/* ========================================================== 
Start HTTP Server Listening on a port
============================================================ */
server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' .red + app.get('port') );
});
