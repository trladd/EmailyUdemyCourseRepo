const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy(['/api/', '/auth/google','/swagger','/api/current_user','/auth/linkedin'], { target: 'http://localhost:5000' }));
}