/*================================================================
Route Definitions

Ref.
https://github.com/request/request

=================================================================*/
'use strict';

var ejs = require('ejs'); //server side templating
var fs = require('fs');
var request = require('request');

/**
 * SendGrid Credentials
 */
var sendgridCredentials = require('../config/sendgridCredentials');   
var sendgrid_username = sendgridCredentials.sendgrid_username;
var sendgrid_password = sendgridCredentials.sendgrid_password;
//var to = sendgridCredentials.to;


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


/*================================================================
ROUTE Definitions
=================================================================*/
module.exports = {

	preview: function(req, res) {

		/**
		 * Data that will be rendered in the ejs email template
		 */
		var emailText = req.body.text;
		emailText = emailText.replace(/(?:\r\n|\r|\n)/g, '<br />');

		/**
		 * Build Email
		 * Sets properties of email object
		 */
		email.addTo(req.body.to);
		email.setFrom(req.body.from);
		email.setSubject(req.body.subject);
//		email.setText(req.body.text); //obsolete as using template
		email.setHtml(ejs.render(template, {emailContent:emailText}));
		email.addSubstitution("%how%", "Owl");
		email.addHeader('X-Sent-Using', 'SendGrid-API');
		email.addHeader('X-Transport', 'web');
		email.addFile({path: '././server/img/gif.gif', filename: 'owl.gif'});

		res.render("email", {emailContent:emailText});	
	},

	getUnsubscribes: function(req, res) {
		// request
		// .get('https://api.sendgrid.com/api/unsubscribes.get.json?api_user=your_sendgrid_username&api_key=your_sendgrid_password&date=1')
		// .on('error', function(err) { console.log(err)})
		// .on()
		request("https://api.sendgrid.com/api/unsubscribes.get.json?api_user="+sendgrid_username+"&api_key="+sendgrid_password+"&date=1", function (error, response, body) {
  			if (!error && response.statusCode == 200) {
    			console.log(body) // Show the HTML for the Google homepage.
  				res.send(body);
  			}
		})
	},


	removeUnsubscribes: function(req, res) {
		// request.post('https://api.sendgrid.com/api/unsubscribes.delete.json', "api_user="+sendgrid_username+"&api_key="+sendgrid_password+"&email="+emailToDelete@domain.com, function (error, response, body) {
		// 		if (!error && response.statusCode == 200) {
		// 		console.log(body) // Show the HTML for the Google homepage.
		// 			res.send(body);
		// 		}
		// })
	},


	sendEmail: function(req, res) {

		/**
		 * Data that will be rendered in the ejs email template
		 */
		var emailText = req.body.text;
		emailText = emailText.replace(/(?:\r\n|\r|\n)/g, '<br />');

		/**
		 * Build Email
		 * Sets properties of email object
		 */
		email.addTo(req.body.to);
		email.setFrom(req.body.from);
		email.setSubject(req.body.subject);
//		email.setText(req.body.text);
		email.setHtml(ejs.render(template, {emailContent:emailText}));
		email.addSubstitution("%how%", "Owl");
		email.addHeader('X-Sent-Using', 'SendGrid-API');
		email.addHeader('X-Transport', 'web');
		email.addFile({path: '././server/img/gif.gif', filename: 'owl.gif'});

		/**
		 * Send Email
		 */
    	sendgrid.send(email, function(err, json) {
		if (err) { 
			return res.send("Problem Sending Email!!!!");
	 	}
			console.log(json);
			res.send("Email Sent OK!!!!");
		});
	}	
};





