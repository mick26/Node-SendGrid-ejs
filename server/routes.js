/*================================================================
Route Declarations

=================================================================*/
'use strict';

/* ========================================================== 
Internal App Modules/Packages Required
============================================================ */
var emailRoutes = require('./routes/email-routes.js');	//Exchange routes


/**
 * ROUTES
 */
module.exports = function(app) {
	app.get('/', emailRoutes.getAck);
	app.get('/preview', emailRoutes.getPreview);
};

