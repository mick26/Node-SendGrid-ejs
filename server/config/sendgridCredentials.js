'use strict';

var dotenv = require('dotenv'); 
dotenv.load(); //load environment variables from .env into ENV (process.env).


/* ========================================================== 
Get SendGrid credentials from process.env
============================================================ */
module.exports = {
	sendgrid_username : process.env.SENDGRID_USERNAME,
	sendgrid_password : process.env.SENDGRID_PASSWORD,
	to                : process.env.TO
};