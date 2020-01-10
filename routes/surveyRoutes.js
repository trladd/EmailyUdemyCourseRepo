const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');



const Survey = mongoose.model('surveys');

module.exports = async app => {

    /**
     * @swagger
     *
     * /api/surveys:
     *   get:
     *     description: gets a list of surveys for a user
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: object of the surveys
     *       401:
     *          description: user must first be logged in
     *          
     */
    app.get('/api/surveys', requireLogin, async (req, res) => {
        const surveys = await Survey.find({_user: req.user.id})
            .select({recipients: false });
        res.send(surveys);
    });


    /**
     * @swagger
     *
     * /api/surveys:
     *   post:
     *     description: Add a new survey and subtract credits
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: add a survey
     *       401:
     *          description: user must be logged in
     *       403:
     *          description: user does not have enough credits
     */
    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const {title, subject, body, recipients} = req.body;
        const {id} = req.user
        const survey = new Survey({
            title, //same as saying 'title: title'
            subject,
            body,
            recipients: recipients.split(',').map(email => ({email: email.trim()})), // short for  '=> {return {email:email}}'
            _user: id,
            dateSent: Date.now()
        });

        //Send an email
        const mailer = new Mailer(survey, surveyTemplate(survey));
        try{
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();
            res.send(user);
        } catch (err){
            res.status(422).send(err);
            
        }
        
    });

    /**
     * @swagger
     *
     * /api/surveys/webhooks:
     *   post:
     *     description: Receives webhook from sendgrid and updates survey information based on received click URL parameter values
     *       - application/json
     *    
     *     responses:
     *       200:
     *         description: login
     */
    app.post('/api/surveys/webhooks', async (req, res) => {
        const p = new Path('/thanks/:surveyId/:choice');

        /*
        const events = _.map(req.body, ({email, url}) => {
            const match = p.test(new URL(url).pathname);
            if(match){
                return {email, surveyId: match.surveyId, choice: match.choice}
            }
        });
        const compactEvents = _.compact(events);
        const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');
        console.log(uniqueEvents);
        res.send({});   //SAME THING IS BELOW JUST WITH SOME CLEANUP AND CHAINING*/
        try{
            _.chain(req.body)
                .map( ({email, url}) => {
                    const match = p.test(new URL(url).pathname);
                    if(match){
                        return {email, surveyId: match.surveyId, choice: match.choice}
                    }
                })
                .compact()
                .uniqBy( 'email', 'surveyId')
                .each(({ surveyId, email, choice }) => {
                    Survey.updateOne({
                        _id:surveyId,
                        recipients:{
                            $elemMatch: { email: email, responded: false } //finds the element that matches to th other one
                        }
                    },{
                        $inc: { [choice]: 1},
                        $set: {'recipients.$.responded': true, //the $ sign lines up with the elemmatch above
                        lastResponded: new Date()}
                    }).exec();
                })
                .value();
            }
            catch(err){
                console.log("An error has occurred receiving webhook\nError: " + err);
                res.status(500).send(err);
            }
            res.send({});


    });

};