const passport = require('passport');

module.exports = app => {
    /**
     * @swagger
     *
     * /auth/google:
     *   get:
     *     description: Login to the application
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: username
     *         description: Username to use for login.
     *         in: formData
     *         required: true
     *         type: string
     *       - name: password
     *         description: User's password.
     *         in: formData
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: login
     */
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }))
    
    /**
     * @swagger
     *
     * /auth/google/callback:
     *   get:
     *     description: Login to the application
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: username
     *         description: Username to use for login.
     *         in: formData
     *         required: true
     *         type: string
     *       - name: password
     *         description: User's password.
     *         in: formData
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: login
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
     *     description: Login to the application
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: login
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
     */
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });    
};

