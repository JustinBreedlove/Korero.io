const assert = require('chai').assert;
const express = require('express');
const request = require('supertest');
const router = require('../routes/sendmessage');

const app = express();
app.use('/', router);

describe('GET /', function() {
  it('responds with status 200', function(done) {
    request(app)
      .get('/')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('responds with "respond with a resource"', function(done) {
    request(app)
      .get('/')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        assert.equal(res.text, 'respond with a resource');
        done();
      });
  });

  describe('POST /send', function() {
    it('returns an error if message is not a string', function(done) {
      request(app)
        .post('/send')
        .send({ message: 123 })
        .expect(400)
        .end(function(err, res) {
          if (err) return done(err);
          assert.equal(res.body.error, 'Message must be a string');
          done();
        });
    });
  
    it('returns an error if message is an empty string', function(done) {
      request(app)
        .post('/send')
        .send({ message: '' })
        .expect(400)
        .end(function(err, res) {
          if (err) return done(err);
          assert.equal(res.body.error, 'Message cannot be empty');
          done();
        });
    });
  
    it('responds with a status code of 404 for invalid route', function(done) {
      request(app)
        .get('/invalid')
        .expect(404)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });
  });
});
