/*
Ref.
This configuration tells Protractor where your test files (specs) are, 
and where to talk to your Selenium Server (seleniumAddress). 
It will use the defaults for all other configuration. 
Chrome is the default browser.
*/

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['checkTitle-spec.js']
}