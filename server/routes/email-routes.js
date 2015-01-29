/*================================================================
Route Definitions

=================================================================*/
'use strict';

var ejs = require('ejs'); //server side templating
var fs = require('fs');

/**
 * SendGrid Credentials
 */
var sendgridCredentials = require('../config/sendgridCredentials');   
var sendgrid_username = sendgridCredentials.sendgrid_username;
var sendgrid_password = sendgridCredentials.sendgrid_password;
var to = sendgridCredentials.to;

/**
 * Initialize the SendGrid object with your SendGrid credentials.
 */
var sendgrid = require('sendgrid')(sendgrid_username, sendgrid_password);

/**
 * ejs E-mail template
 */
var template = fs.readFileSync('././server/views/email.ejs', 'utf-8');

/**
 * Create an Email object
 */
var email      = new sendgrid.Email();

/**
 * Data that will be rendered in the ejs email template
 */
var name = "John Doe";


/* ========================================================== 
Add parameters to Email object created earlier
This will be the Email message details.
============================================================ */
email.addTo(to);
email.setFrom(to);
email.setSubject('E-mail sent via SendGrid');
email.setText('Hello There?');
email.setHtml(ejs.render(template, {name:name}));
email.addSubstitution("%how%", "Owl");
email.addHeader('X-Sent-Using', 'SendGrid-API');
email.addHeader('X-Transport', 'web');
email.addFile({path: '././server/img/gif.gif', filename: 'owl.gif'});


/*================================================================
ROUTE Definitions
=================================================================*/
module.exports = {

	getAck: function(req, res) {
    	sendgrid.send(email, function(err, json) {
		if (err) { 
			return res.send("Problem Sending Email!!!!");
	 	}
			console.log(json);
			res.send("Email Sent OK!!!!");
		});
	},

	getPreview: function(req, res) {
		res.render("email", {name:name});
	}
};