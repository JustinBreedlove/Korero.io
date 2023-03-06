const assert = require('chai').assert;
const isPhoneSanitized = require('../routes/createuser').isPhoneSanitized;
const otp = require('../routes/createuser').otp;
const { expect } = require('chai');
const { isEmailSanitized } = require('../routes/createuser');


//testing variables from createuser.js
//input has not been given so the tests are making sure that the variables have not been defined yet
describe("isEmailSanitized", function () {
  it("should return true for a valid email", function () {
    assert.isTrue(isEmailSanitized("john@example.com"));
  });
  it("should return false for an email with spaces", function () {
    assert.isFalse(isEmailSanitized("j ohn@exam ple.com"));
  });
  it("should return false for an email without an @ symbol", function () {
    assert.isFalse(isEmailSanitized("johneexample.com"));
  });
});

describe('isPhoneSanitzed', function(){
  it('Phone sanitized should be undefined', function(){
    let result = isPhoneSanitized;
    assert.typeOf(result, 'undefined')
  });
});


describe('otp', function(){
  it('otp should be undefined', function(){
    let result = otp;
    assert.typeOf(result, 'undefined')
  });
});

const carrierDomains = require('../routes/createuser').carrierDomains;

describe('carrierDomains', function() {
  it('should contain the correct domain for T-Mobile', function() {
    expect(carrierDomains.tmobile).to.equal('tmomail.net');
  });

  it('should contain the correct domain for Sprint', function() {
    expect(carrierDomains.sprint).to.equal('messaging.sprintpcs.com');
  });

  it('should contain the correct domain for Verizon', function() {
    expect(carrierDomains.verizon).to.equal('vtext.com');
  });

  it('should contain the correct domain for AT&T', function() {
    expect(carrierDomains.att).to.equal('txt.att.net');
  });
});

//example of a test
/*
describe('name', function(){
  it('description', function(){
    assert.equal(value we want to test(), 'what it should return')
  });
});
*/