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

	app.post('/preview', emailRoutes.preview);
	app.get('/unsubscribe', emailRoutes.getUnsubscribes);
	app.post('/email', emailRoutes.sendEmail);

	//app.post('/unsubscribe', emailRoutes.removeUnsubscribe);
};

