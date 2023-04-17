const assert = require('chai').assert;
const express = require('express');
const router = require('../routes/live');
const app = express();

describe('Live Route', function() {
  this.timeout(5000); // increase timeout to 5 seconds
  it('should return a 200 status code', function(done) {
    const res = {
      status: function(code) {
        this.statusCode = code;
        return this;
      },
      send: function() {
        assert.strictEqual(res.statusCode, 200, 'Wrong status code returned');
        done();
      }
    };
    const next = function() {
      // handle the request
      done();
    };
    router.handle({ method: 'get', url: '/' }, res, next);

   //Uncomment this to test case any error codes here
   //it('should return a 404 status code', function(done) { // change expected status code to 404
   //     const res = {
   //       status: function(code) {
   //       this.statusCode = code;
   //         return this;
   //       },
   //       send: function() {
   //         assert.strictEqual(res.statusCode, 404, 'Wrong status code returned'); // assert for 404 status code
   //         done();
   //       }
   //     };
   //     const next = function() {
   //       // handle the request
   //       done(new Error('Route should not call next()')); // force the test to fail if next() is called
   //     };
   //     router.handle({ method: 'get', url: '/' }, res, next);
   //   });
    });
});