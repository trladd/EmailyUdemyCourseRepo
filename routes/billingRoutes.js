const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {

    /**
     * @swagger
     *
     * /api/stripe:
     *   post:
     *     description: submit payment to stripe
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: req.body.id
     *         description: ID from swipe to identify transaction
     *         in: req
     *         required: true
     *         type: string
     *       
     *     responses:
     *       200:
     *         description: user object passed back with updated credit number
     *              
     */
    app.post('/api/stripe', requireLogin, async (req, res) => {
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credits',
            source: req.body.id
        });
        
        req.user.credits += 5;
        const user = await req.user.save();

        res.send(user);
    });
};