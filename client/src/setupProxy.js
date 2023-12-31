const { createProxyMiddleware } = require('http-proxy-middleware');

/**Caching is causing issues
 * https://github.com/helmetjs/nocache (?)
*/
module.exports = function(app) {
  app.use(
    '/live',
    createProxyMiddleware({
      target: `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`,
      changeOrigin: true
    })
  );



  app.use(
    '/session/login',
    createProxyMiddleware({
      target: `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`,
      changeOrigin: true
    })
  );



  app.use(
    '/session/logout',
    createProxyMiddleware({
      target: `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`,
      changeOrigin: true
    })
  );



  app.use(
    '/createuser',
    createProxyMiddleware({
      target: `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`,
      changeOrigin: true
    })
  );



  app.use(
    '/createuser/checkotp',
    createProxyMiddleware({
      target: `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`,
      changeOrigin: true
    })
  );



  app.use(
    '/chat/start',
    createProxyMiddleware({
      target: `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`,
      changeOrigin: true
    })
  );



  app.use(
    '/chat/send',
    createProxyMiddleware({
      target: `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`,
      changeOrigin: true
    })
  );

  app.use(
    '/chat/get',
    createProxyMiddleware({
      target: `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`,
      changeOrigin: true
    })
  );  
  app.use(
    '/users/pfp',
    createProxyMiddleware({
      target: `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`,
      changeOrigin: true
    })
  );
  app.use(
    '/otp/checkreset',
    createProxyMiddleware({
      target: `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`,
      changeOrigin: true
    })
  );
  app.use(
    '/password/reset',
    createProxyMiddleware({
      target: `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`,
      changeOrigin: true
    })
  );

  app.use(
    '/password/user',
    createProxyMiddleware({
      target: `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`,
      changeOrigin: true
    })
  );
};