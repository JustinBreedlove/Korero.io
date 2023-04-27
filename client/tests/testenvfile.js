//Testing all variables in .env.PRODUCTION file
//Using Chai for testing all variables
const assert = require('chai').assert;

//testing functions from setupProxy
const dotenv = require('dotenv'); // Importing dotenv package

dotenv.config({ path: '.env.production' });

describe('Middleware', function() {
    const FAST_REFRESH = process.env.FAST_REFRESH;;// Test: refresh rate for browser to see if its false 
    const BROWSER = process.env.BROWSER;;// Test: check if browser is disable or set to none
  
    it('should have FAST_REFRESH set to false', function() {
      console.log('FAST_REFRESH:', FAST_REFRESH);
      assert.equal(FAST_REFRESH, 'false');
    });
  
    it('should have FAST_REFRESH set to true', function() {
      console.log('FAST_REFRESH:', FAST_REFRESH);
      assert.equal(FAST_REFRESH, 'true');
    });
  
    it('should check if the browser is disabled', function() {
      console.log('BROWSER:', BROWSER);
      assert.equal(BROWSER, 'none');
    });
  
    it('should check if the browser is true', function() {
      console.log('BROWSER:', BROWSER);
      assert.equal(BROWSER, 'true');
    });
});    
