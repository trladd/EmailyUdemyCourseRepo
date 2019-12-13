const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {

    app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
        const {title, subject, body, recipients} = req.body;

        const survey = new Survey({
            title, //same as saying 'title: title'
            subject,
            body,
            recipients: recipients.split(',').map(email => ({email: email.trim()})), // short for  '=> {return {email:email}}'
            user: req.user.id,
            dateSent: Date.now()
        });

        //Send an email
        const mailer = new Mailer(survey, surveyTemplate(survey));

    });

};