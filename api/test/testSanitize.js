const assert = require('chai').assert;
//testing functions from sanitize/sanitize
const { isEmailSanitary, isPhoneSanitary, isOTPSanitary, isUsernameSanitary } = require('../sanitize/sanitize');

//test for isEmailSanitary
describe('isEmailSanitary', function() {
  it('should return true for a valid email', function() {
    const email = 'john.doe@example.com';
    const result = isEmailSanitary(email);
    assert.equal(result, true);
  });

  it('should return false for an email without an "@" symbol', function() {
    const email = 'johndoeexample.com';
    const result = isEmailSanitary(email);
    assert.equal(result, false);
  });

  it('should return false for an email without a top-level domain', function() {
    const email = 'johndoe@example';
    const result = isEmailSanitary(email);
    assert.equal(result, false);
  });

  it('should return false for an email containing disallowed characters', function() {
    const email = 'john.doe@ex#ample.com';
    const result = isEmailSanitary(email);
    assert.equal(result, false);
  });

  it('should return false for an email containing multiple "@" symbols', function() {
    const email = 'john@doe@example.com';
    const result = isEmailSanitary(email);
    assert.equal(result, false);
  });
});

//test for isPhoneSanitary
describe('isPhoneSanitary', function() {
  it('should return true for a 10-digit American phone number', function() {
    const phone = '1234567890';
    const result = isPhoneSanitary(phone);
    assert.isTrue(result);
  });

  it('should return false for a non-10-digit phone number', function() {
    const phone = '1234';
    const result = isPhoneSanitary(phone);
    assert.isFalse(result);
  });

  it('should return false for a phone number with non-digits', function() {
    const phone = '123-456-7890';
    const result = isPhoneSanitary(phone);
    assert.isFalse(result);
  });
});

//test for isOTPSanitary
describe('isOTPSanitary', function() {
  it('should return true for a 6-digit OTP', function() {
    const otp = '123456';
    const result = isOTPSanitary(otp);
    assert.isTrue(result);
  });

  it('should return false for a non-6-digit OTP', function() {
    const otp = '12345';
    const result = isOTPSanitary(otp);
    assert.isFalse(result);
  });

  it('should return false for an OTP containing non-digits', function() {
    const otp = '1a2b3c';
    const result = isOTPSanitary(otp);
    assert.isFalse(result);
  });
});

//test for isUsernameSanitary
describe('isUsernameSanitary', function() {
  it('should return true for a username with only allowed characters', function() {
    const username = 'goodUsername123';
    const result = isUsernameSanitary(username);
    assert.isTrue(result);
  });

  it('should return false for a username with disallowed characters', function() {
    const username = 'badUsername!@#';
    const result = isUsernameSanitary(username);
    assert.isFalse(result);
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