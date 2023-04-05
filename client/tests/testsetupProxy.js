const assert = require('chai').assert;

//testing functions from setupProxy
const { createProxyMiddleware } = require('http-proxy-middleware');
const dotenv = require('dotenv'); // Importing dotenv package

dotenv.config({ path: '.env.production' });

// Test for middleware proxy connection verification
describe('Middleware', function() {
  const REACT_APP_API_HOST = process.env.REACT_APP_API_HOST;; // API host from .env.PRODUCTION
  const REACT_APP_API_PORT = process.env.REACT_APP_API_PORT;; // API port from .env.PRODUCTION

  //Checks to see if /live has its proxy created
  it('should create proxy middleware for "/live"', function() {
    console.log('REACT_APP_API_HOST:', REACT_APP_API_HOST);
    console.log('REACT_APP_API_PORT:', REACT_APP_API_PORT);

    const proxy = createProxyMiddleware('/live', { 
      target: `http://${REACT_APP_API_HOST}:${REACT_APP_API_PORT}`,
      changeOrigin: true,
    });
    
    const req = {};
    const res = {};
    
    proxy(req, res, function(){
      // Check if proxy is a function
      assert.equal(req.url, '/live');
      assert.equal(req.headers.host, `${REACT_APP_API_HOST}:${REACT_APP_API_PORT}`);
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
      assert.equal(req.headers.host, `${REACT_APP_API_HOST}:${REACT_APP_API_PORT}`);
      done();
    });
  });

  ////Checks to see if /session/logout has its proxy created
  it('should create proxy middleware for "/session/logout"', function() {
    console.log('REACT_APP_API_HOST:', REACT_APP_API_HOST);
    console.log('REACT_APP_API_PORT:', REACT_APP_API_PORT);

    const proxy = createProxyMiddleware('/session/logout', { 
      target: `http://${REACT_APP_API_HOST}:${REACT_APP_API_PORT}`,
      changeOrigin: true,
    });
    
    const req = {};
    const res = {};
    
    proxy(req, res, function(){
      // Check if proxy is a function
      assert.equal(req.url, '/session/logout');
      assert.equal(req.headers.host, `${REACT_APP_API_HOST}:${REACT_APP_API_PORT}`);
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
});