/*
https://docs.angularjs.org/api/ng/directive/ngDisabled
Populate E-mail for with valid date
Click Preview button
Check the button is not disabled
*/


describe('My E-mail App', function() {
  

  it('should populate form fields and click Preview Button', function() {
    browser.get('http://localhost:8800/');
    element(by.model('email.to')).sendKeys("mick@gmail.ie");
    element(by.model('email.from')).sendKeys("caitriona@gmail.com");
    element(by.model('email.subject')).sendKeys("Protractor Test");
    element(by.model('email.text')).sendKeys("Email Body Text!!!!");
    element(by.id("emailPreviewBn")).click();

 	expect(element(by.id("emailPreviewBn")).getAttribute('disabled')).toBeFalsy();
//  	expect(element(by.id("emailPreviewBn")).getAttribute('disabled')).toBeTruthy(); //For Testing gives a Fail

  });
});