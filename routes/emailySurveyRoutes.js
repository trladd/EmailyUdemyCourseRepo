const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');



const SurveyTemplate = mongoose.model('surveyTemplate');

module.exports = async app => {
    /**
     * @swagger
     *
     * /api/surveys/templates/global:
     *   get:
     *     description: gets a list of global survey templates
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: object of the surveys
     *       401:
     *          description: user must first be logged in
     *          
     */
    app.get('/api/surveys/templates/global', requireLogin, async (req, res) => {
        const templates = await SurveyTemplate.find({owner: "global"})
            .select();
        res.send(templates);
    });


    /**
     * @swagger
     *
     *  /api/surveys/templates/global:
     *      post:
     *          description: Add a new global survey
     *          consumes:
     *              - application/json
     *          parameters:
     *              - in: body
     *          responses:
     *              200:
     *                  description: add a survey
     *              401:
     *                  description: user must be logged in
     *              403:
     *                  description: user does not have enough credits
     */
    app.post('/api/surveys/templates/global', async (req, res) => {
        console.log(req.body);
        const survey = new SurveyTemplate(req.body);
        survey.owner = "global";
        survey.addedDate = Date.now();
        try{
            await survey.save();
            res.send({
                message: "Survey Added",
                survey
            });
        } catch (err){
            res.status(422).send(err);
            
        }
        
    });

};