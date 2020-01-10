const passport = require('passport');

module.exports = app => {
    /**
     * @swagger
     *
     * /auth/google:
     *   get:
     *     description: Login to the application via google
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: passes user on to google for oauth authentication
     */
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }))
    
    /**
     * @swagger
     *
     * /auth/google/callback:
     *   get:
     *     description: callback for google for oauth authentication
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: 
     */
    app.get(
        '/auth/google/callback', 
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/surveys');
        }
    ); //has code query parameter now and so will exchange code for user profile

        /**
     * @swagger
     *
     * /api/logout:
     *   get:
     *     description: Logs out by clearing session information
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: logout
     */
    app.get('/api/logout', (req,res) => {
        req.logout();
        res.redirect('/');
    });

    /**
     * @swagger
     *
     * /api/current_user:
     *   get:
     *     description: Gets the current user object
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: user
     *       401:
     *          description: not logged in 
     */
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });    
};

