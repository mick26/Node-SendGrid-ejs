/*
https://docs.angularjs.org/api/ng/directive/ngDisabled
*/


describe('My E-mail App', function() {
  

  it('should populate form fields and click Preview Button', function() {
    browser.get('http://localhost:8800/');
    element(by.model('email.to')).sendKeys("mick@gmail.ie");
    element(by.model('email.from')).sendKeys("caitriona@gmail.com");
    element(by.model('email.subject')).sendKeys("Protractor Test");
    element(by.model('email.text')).sendKeys("Email Body Text!!!!");
    element(by.id("emailPreviewBn")).click();

  	expect(element(by.id("emailPreviewBn")).getAttribute('disabled')).toBeTruthy();
//  expect(element(by.id("emailPreviewBn")).getAttribute('disabled')).toBeFalsy();//For Testing gives a Fail

  });
});