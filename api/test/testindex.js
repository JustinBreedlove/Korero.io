const assert = require('chai').assert;
const express = require('express');
const router = require('../routes/index');
const app = express();

describe('Index Route', () => {
  it('should render the index view with the correct title', () => {
    const expectedTitle = 'Express';
    const res = {
      render: (view, data) => {
        assert.strictEqual(view, 'index', 'Wrong view rendered');
        assert.strictEqual(data.title, expectedTitle, 'Wrong title');
      }
    };
    router.handle({ method: 'get', url: '/' }, res);
  });

  it('should handle a server error and return a 500 status code', (done) => {
    const res = {
      status: (statusCode) => {
        assert.strictEqual(statusCode, 500, 'Wrong status code returned');
        return res;
      },
      send: (message) => {
        assert.isString(message, 'Error message should be a string');
        done();
      }
    };
    router.handle({ method: 'get', url: '/' }, res, (err) => {
      assert.instanceOf(err, Error, 'Expected an error to be thrown');
      done();
    });
  });
});
