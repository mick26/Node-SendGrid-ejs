/*
Ref.
This configuration tells Protractor where your test files (specs) are, 
and where to talk to your Selenium Server (seleniumAddress). 
It will use the defaults for all other configuration. 
Chrome is the default browser.
All browser setup is done within the capabilities object. 
This object is passed directly to the WebDriver builder (builder.js).
*/

exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',


  	capabilities: {
	  	//'browserName': 'firefox'
	  	'browserName': 'chrome',
	  	'chromeOptions': {
	    	'args': ['show-fps-counter=true']
	  	}
  	},

  	/*
  	Tests multiple browsers 
  	If defined capabilities is ignored
  	Note: Firefox opens for me but the view is not rendered and the test fails?
  	Chrome works fine 
  	*/
 	//multiCapabilities: [{
	// 		'browserName': 'firefox'
	// 	}, 
	// 	{
	// 		'browserName': 'chrome'
	// 	}
	// ],

	specs: ['checkFormPreviewBn-spec.js'],

  	jasmineNodeOpts: {
  		showColors: true
  	}
}
