const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://movie-api-server.run.goorm.io',
            changeOrigin: true,
        })
    );
};