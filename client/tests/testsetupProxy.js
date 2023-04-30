//Test Cases for every Proxy that is Using Middleware and checking if connection is Successful

//Using Chai for testing all variables
const assert = require('chai').assert;

//testing functions from setupProxy
const { createProxyMiddleware } = require('http-proxy-middleware');
const dotenv = require('dotenv'); // Importing dotenv package

dotenv.config({ path: '.env.production' });

// Test for middleware proxy connection verification
describe('Middleware', function() {
  const REACT_APP_API_HOST = process.env.REACT_APP_API_HOST;; // Test: API host from .env.PRODUCTION
  const REACT_APP_API_PORT = process.env.REACT_APP_API_PORT;; // Test: API port from .env.PRODUCTION

  const REACT_APP_HOST = process.env.REACT_APP_HOST;; // Test: Host from .env.PRODUCTION
  const REACT_APP_PORT = process.env.REACT_APP_PORT;; // Test: Port from .env.PRODUCTION

  //Checks to see if /live has its proxy created
  it('should create proxy middleware for "/live"', function() {
    console.log('REACT_APP_HOST:', REACT_APP_HOST);
    console.log('REACT_APP_PORT:', REACT_APP_PORT);

    const proxy = createProxyMiddleware('/live', { 
      target: `http://${REACT_APP_HOST}:${REACT_APP_PORT}`,
      changeOrigin: true,
    });
    
    const req = {};
    const res = {};
    
    proxy(req, res, function(){
      // Check if proxy is a function
      assert.equal(req.url, '/live');
      assert.equal(req.headers.host, `${REACT_APP_HOST}:${REACT_APP_PORT}`);
      done();
    });
  });

  it('should fail to create proxy middleware for "/live" with invalid target URL', function() {
    console.log('REACT_APP_HOST:', REACT_APP_HOST);
    console.log('REACT_APP_PORT:', REACT_APP_PORT);

    const proxy = createProxyMiddleware('/live', { 
      target: 'invalid_url',
      changeOrigin: true,
    });
    
    const req = {};
    const res = {};
    
    proxy(req, res, function(){
      // This function should not be called
      assert.fail('Proxy middleware created successfully, but it should have failed');
      done();
    });
 });

  //Checks to see if /session/login has its proxy created
  it('should create proxy middleware for "/session/login"', function() {
    console.log('REACT_APP_API_HOST:', REACT_APP_API_HOST);
    console.log('REACT_APP_API_PORT:', REACT_APP_API_PORT);

    const proxy = createProxyMiddleware('/session/login', { 
      target: `http://${REACT_APP_API_HOST}:${REACT_APP_API_PORT}`,
      changeOrigin: true,
    });
    
    const req = {};
    const res = {};
    
    proxy(req, res, function(){
      // Check if proxy is a function
      assert.equal(req.url, '/session/login');
      assert.equal(req.headers.host, `${REACT_APP_HOST}:${REACT_APP_PORT}`);
      done();
    });
  });

  it('should fail to create proxy middleware for "/session/login" with invalid target URL', function() {
    console.log('REACT_APP_HOST:', REACT_APP_HOST);
    console.log('REACT_APP_PORT:', REACT_APP_PORT);

    const proxy = createProxyMiddleware('/session/login', { 
      target: 'invalid_url',
      changeOrigin: true,
    });
    
    const req = {};
    const res = {};
    
    proxy(req, res, function(){
      // This function should not be called
      assert.fail('Proxy middleware created successfully, but it should have failed');
      done();
    });
 });

  ////Checks to see if /session/logout has its proxy created
  it('should create proxy middleware for "/session/logout"', function() {
    console.log('REACT_APP_HOST:', REACT_APP_HOST);
    console.log('REACT_APP_PORT:', REACT_APP_PORT);

    const proxy = createProxyMiddleware('/session/logout', { 
      target: `http://${REACT_APP_HOST}:${REACT_APP_PORT}`,
      changeOrigin: true,
    });
    
    const req = {};
    const res = {};
    
    proxy(req, res, function(){
      // Check if proxy is a function
      assert.equal(req.url, '/session/logout');
      assert.equal(req.headers.host, `${REACT_APP_HOST}:${REACT_APP_PORT}`);
      done();
    });
  });

  it('should fail to create proxy middleware for "/session/logout" with invalid target URL', function() {
    console.log('REACT_APP_HOST:', REACT_APP_HOST);
    console.log('REACT_APP_PORT:', REACT_APP_PORT);

    const proxy = createProxyMiddleware('/session/logout', { 
      target: 'invalid_url',
      changeOrigin: true,
    });
    
    const req = {};
    const res = {};
    
    proxy(req, res, function(){
      // This function should not be called
      assert.fail('Proxy middleware created successfully, but it should have failed');
      done();
    });
 });

  //Checks to see if /createuser has its proxy created
  it('should create proxy middleware for "/createuser"', function() {
    console.log('REACT_APP_API_HOST:', REACT_APP_API_HOST);
    console.log('REACT_APP_API_PORT:', REACT_APP_API_PORT);

    const proxy = createProxyMiddleware('/createuser', { 
      target: `http://${REACT_APP_API_HOST}:${REACT_APP_API_PORT}`,
      changeOrigin: true,
    });
    
    const req = {};
    const res = {};
    
    proxy(req, res, function(){
      // Check if proxy is a function
      assert.equal(req.url, '/createuser');
      assert.equal(req.headers.host, `${REACT_APP_API_HOST}:${REACT_APP_API_PORT}`);
      done();
    });
  });

  it('should fail to create proxy middleware for "/createuser" with invalid target URL', function() {
    console.log('REACT_APP_HOST:', REACT_APP_HOST);
    console.log('REACT_APP_PORT:', REACT_APP_PORT);

    const proxy = createProxyMiddleware('/createuser', { 
      target: 'invalid_url',
      changeOrigin: true,
    });
    
    const req = {};
    const res = {};
    
    proxy(req, res, function(){
      // This function should not be called
      assert.fail('Proxy middleware created successfully, but it should have failed');
      done();
    });
 });

  //Checks to see if /createuser/checkotp has its proxy created
  it('should create proxy middleware for "/createuser/checkotp"', function() {
    console.log('REACT_APP_API_HOST:', REACT_APP_API_HOST);
    console.log('REACT_APP_API_PORT:', REACT_APP_API_PORT);

    const proxy = createProxyMiddleware('/createuser/checkotp', { 
      target: `http://${REACT_APP_API_HOST}:${REACT_APP_API_PORT}`,
      changeOrigin: true,
    });
    
    const req = {};
    const res = {};
    
    proxy(req, res, function(){
      // Check if proxy is a function
      assert.equal(req.url, '/createuser/checkotp');
      assert.equal(req.headers.host, `${REACT_APP_API_HOST}:${REACT_APP_API_PORT}`);
      done();
    });
  });

  it('should fail to create proxy middleware for "/createuser/checkotp" with invalid target URL', function() {
    console.log('REACT_APP_HOST:', REACT_APP_HOST);
    console.log('REACT_APP_PORT:', REACT_APP_PORT);

    const proxy = createProxyMiddleware('/createuser/checkotp', { 
      target: 'invalid_url',
      changeOrigin: true,
    });
    
    const req = {};
    const res = {};
    
    proxy(req, res, function(){
      // This function should not be called
      assert.fail('Proxy middleware created successfully, but it should have failed');
      done();
    });
 });

  ////Checks to see if /chat/send has its proxy created
  it('should create proxy middleware for "/chat/send"', function() {
    console.log('REACT_APP_API_HOST:', REACT_APP_API_HOST);
    console.log('REACT_APP_API_PORT:', REACT_APP_API_PORT);

    const proxy = createProxyMiddleware('/chat/send', { 
      target: `http://${REACT_APP_API_HOST}:${REACT_APP_API_PORT}`,
      changeOrigin: true,
    });
    
    const req = {};
    const res = {};
    
    proxy(req, res, function(){
      // Check if proxy is a function
      assert.equal(req.url, '/chat/send');
      assert.equal(req.headers.host, `${REACT_APP_API_HOST}:${REACT_APP_API_PORT}`);
      done();
    });
  });

  it('should fail to create proxy middleware for "/chat/send" with invalid target URL', function() {
    console.log('REACT_APP_HOST:', REACT_APP_HOST);
    console.log('REACT_APP_PORT:', REACT_APP_PORT);

    const proxy = createProxyMiddleware('/chat/send', { 
      target: 'invalid_url',
      changeOrigin: true,
    });
    
    const req = {};
    const res = {};
    
    proxy(req, res, function(){
      // This function should not be called
      assert.fail('Proxy middleware created successfully, but it should have failed');
      done();
    });
 });

  //Checks to see if /chat/get has its proxy created
  it('should create proxy middleware for "/chat/get"', function() {
    console.log('REACT_APP_API_HOST:', REACT_APP_API_HOST);
    console.log('REACT_APP_API_PORT:', REACT_APP_API_PORT);

    const proxy = createProxyMiddleware('/chat/get', { 
      target: `http://${REACT_APP_API_HOST}:${REACT_APP_API_PORT}`,
      changeOrigin: true,
    });
    
    const req = {};
    const res = {};
    
    proxy(req, res, function(){
      // Check if proxy is a function
      assert.equal(req.url, '/chat/get');
      assert.equal(req.headers.host, `${REACT_APP_API_HOST}:${REACT_APP_API_PORT}`);
      done();
    });
  });

  it('should fail to create proxy middleware for "/chat/get" with invalid target URL', function() {
    console.log('REACT_APP_HOST:', REACT_APP_HOST);
    console.log('REACT_APP_PORT:', REACT_APP_PORT);

    const proxy = createProxyMiddleware('/chat/get', { 
      target: 'invalid_url',
      changeOrigin: true,
    });
    
    const req = {};
    const res = {};
    
    proxy(req, res, function(){
      // This function should not be called
      assert.fail('Proxy middleware created successfully, but it should have failed');
      done();
    });
 });

  //Checks to see if /users/pfp has its proxy created
  it('should create proxy middleware for "/users/pfp"', function() {
    console.log('REACT_APP_API_HOST:', REACT_APP_API_HOST);
    console.log('REACT_APP_API_PORT:', REACT_APP_API_PORT);

    const proxy = createProxyMiddleware('/users/pfp', { 
      target: `http://${REACT_APP_API_HOST}:${REACT_APP_API_PORT}`,
      changeOrigin: true,
    });
    
    const req = {};
    const res = {};
    
    proxy(req, res, function(){
      // Check if proxy is a function
      assert.equal(req.url, '/users/pfp');
      assert.equal(req.headers.host, `${REACT_APP_API_HOST}:${REACT_APP_API_PORT}`);
      done();
    });
  });

  it('should fail to create proxy middleware for "/users/pfp" with invalid target URL', function() {
    console.log('REACT_APP_HOST:', REACT_APP_HOST);
    console.log('REACT_APP_PORT:', REACT_APP_PORT);

    const proxy = createProxyMiddleware('/users/pfp', { 
      target: 'invalid_url',
      changeOrigin: true,
    });
    
    const req = {};
    const res = {};
    
    proxy(req, res, function(){
      // This function should not be called
      assert.fail('Proxy middleware created successfully, but it should have failed');
      done();
    });
  });

  //Checks to see if /otp/checkreset has its proxy created
  it('should create proxy middleware for "/otp/checkreset"', function() {
    console.log('REACT_APP_API_HOST:', REACT_APP_API_HOST);
    console.log('REACT_APP_API_PORT:', REACT_APP_API_PORT);

    const proxy = createProxyMiddleware('/otp/checkreset', { 
      target: `http://${REACT_APP_API_HOST}:${REACT_APP_API_PORT}`,
      changeOrigin: true,
    });
    
    const req = {};
    const res = {};
    
    proxy(req, res, function(){
      // Check if proxy is a function
      assert.equal(req.url, '/otp/checkreset');
      assert.equal(req.headers.host, `${REACT_APP_API_HOST}:${REACT_APP_API_PORT}`);
      done();
    });
  });

  it('should fail to create proxy middleware for "/otp/checkreset" with invalid target URL', function() {
    console.log('REACT_APP_HOST:', REACT_APP_HOST);
    console.log('REACT_APP_PORT:', REACT_APP_PORT);

    const proxy = createProxyMiddleware('/otp/checkreset', { 
      target: 'invalid_url',
      changeOrigin: true,
    });
    
    const req = {};
    const res = {};
    
    proxy(req, res, function(){
      // This function should not be called
      assert.fail('Proxy middleware created successfully, but it should have failed');
      done();
    });
  });

  //Checks to see if /password/reset has its proxy created
  it('should create proxy middleware for "/password/reset"', function() {
    console.log('REACT_APP_API_HOST:', REACT_APP_API_HOST);
    console.log('REACT_APP_API_PORT:', REACT_APP_API_PORT);

    const proxy = createProxyMiddleware('/password/reset', { 
      target: `http://${REACT_APP_API_HOST}:${REACT_APP_API_PORT}`,
      changeOrigin: true,
    });
    
    const req = {};
    const res = {};
    
    proxy(req, res, function(){
      // Check if proxy is a function
      assert.equal(req.url, '/password/reset');
      assert.equal(req.headers.host, `${REACT_APP_API_HOST}:${REACT_APP_API_PORT}`);
      done();
    });
  });

  it('should fail to create proxy middleware for "/password/reset" with invalid target URL', function() {
    console.log('REACT_APP_HOST:', REACT_APP_HOST);
    console.log('REACT_APP_PORT:', REACT_APP_PORT);

    const proxy = createProxyMiddleware('/password/reset', { 
      target: 'invalid_url',
      changeOrigin: true,
    });
    
    const req = {};
    const res = {};
    
    proxy(req, res, function(){
      // This function should not be called
      assert.fail('Proxy middleware created successfully, but it should have failed');
      done();
    });
  });

  //Checks to see if /users/pfp/** has its proxy created
  it('should create proxy middleware for "/users/pfp"', function() {
    console.log('REACT_APP_API_HOST:', REACT_APP_API_HOST);
    console.log('REACT_APP_API_PORT:', REACT_APP_API_PORT);

    const proxy = createProxyMiddleware('/users/pfp/**', { 
      target: `http://${REACT_APP_API_HOST}:${REACT_APP_API_PORT}`,
      changeOrigin: true,
    });
    
    const req = {};
    const res = {};
    
    proxy(req, res, function(){
      // Check if proxy is a function
      assert.equal(req.url, '/users/pfp/**');
      assert.equal(req.headers.host, `${REACT_APP_API_HOST}:${REACT_APP_API_PORT}`);
      done();
    });
  });

  it('should fail to create proxy middleware for "/users/pfp/**" with invalid target URL', function() {
    console.log('REACT_APP_HOST:', REACT_APP_HOST);
    console.log('REACT_APP_PORT:', REACT_APP_PORT);

    const proxy = createProxyMiddleware('/users/pfp/**', { 
      target: 'invalid_url',
      changeOrigin: true,
    });
    
    const req = {};
    const res = {};
    
    proxy(req, res, function(){
      // This function should not be called
      assert.fail('Proxy middleware created successfully, but it should have failed');
      done();
    });
  });

  //Checks to see if /users/upload/pfp has its proxy created
  it('should create proxy middleware for "/users/upload/pfp"', function() {
    console.log('REACT_APP_API_HOST:', REACT_APP_API_HOST);
    console.log('REACT_APP_API_PORT:', REACT_APP_API_PORT);

    const proxy = createProxyMiddleware('/users/upload/pfp', { 
      target: `http://${REACT_APP_API_HOST}:${REACT_APP_API_PORT}`,
      changeOrigin: true,
    });
    
    const req = {};
    const res = {};
    
    proxy(req, res, function(){
      // Check if proxy is a function
      assert.equal(req.url, '/users/upload/pfp');
      assert.equal(req.headers.host, `${REACT_APP_API_HOST}:${REACT_APP_API_PORT}`);
      done();
    });
  });

  it('should fail to create proxy middleware for "/users/upload/pfp" with invalid target URL', function() {
    console.log('REACT_APP_HOST:', REACT_APP_HOST);
    console.log('REACT_APP_PORT:', REACT_APP_PORT);

    const proxy = createProxyMiddleware('/users/upload/pfp', { 
      target: 'invalid_url',
      changeOrigin: true,
    });
    
    const req = {};
    const res = {};
    
    proxy(req, res, function(){
      // This function should not be called
      assert.fail('Proxy middleware created successfully, but it should have failed');
      done();
    });
  });
});
