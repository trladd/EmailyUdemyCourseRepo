const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireAdmin = require('../middlewares/requireAdmin');
const templateUtils = require('../util/templateUtils');



const SurveyTemplate = mongoose.model('surveyTemplate');

module.exports = async app => {

    /**
     * @swagger
     *
     * /api/surveys/templates/user:
     *   get:
     *     description: gets a list of user survey templates
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: object of the survey templates for a user
     *       401:
     *          description: user must first be logged in
     *          
     */
    app.get('/api/surveys/templates/user', requireLogin, async (req, res) => {
        const templates = await SurveyTemplate.find({owner: req.user.id})
            .select({questions: false,
                    defaultIntroText: false,
                    owner: false});
        res.send(templates);
    });
    
    /**
     * @swagger
     *
     *  /api/surveys/templates/user:
     *      post:
     *          description: Add a new global survey
     *          consumes:
     *              - application/json
     *          parameters:
     *              - in: body
     *          responses:
     *              201:
     *                  description: added survey
     *              401:
     *                  description: user must be logged in
     */
    app.post('/api/surveys/templates/user', requireLogin, async (req, res) => {
        const cleanedSurvey = templateUtils.clearAllIDs(req.body);
        const survey = new SurveyTemplate(cleanedSurvey);
        survey.owner = req.user.id;
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
        res.status(201).send({message: "created", survey: survey});
        
    });

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
     *       403:
     *          description: user does not have administrator rights
     *          
     */
    app.get('/api/surveys/templates/global', requireLogin, async (req, res) => {
        const templates = await SurveyTemplate.find({owner: "global"})
            .select({questions: false,
                    defaultIntroText: false,
                    owner: false});
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
     *                name: body
     *                description: the survey in the body
     *                schema:
     *                  type: object
     *                  properties:
     *                      name:
     *                          type: string
     *          responses:
     *              200:
     *                  description: add a survey
     *              401:
     *                  description: user must be logged in
     *              403:
     *                  description: user does not have administrator rights
     */
    app.post('/api/surveys/templates/global', requireAdmin, async (req, res) => {
        const cleanedSurvey = templateUtils.clearAllIDs(req.body);
        const survey = new SurveyTemplate(cleanedSurvey);
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
        res.status(201).send({message: "created", survey: survey});
    });

    /**
     * @swagger
     *
     * /api/surveys/template/{templateID}:
     *   get:
     *     description: gets a particular templateID
     *     produces:
     *       - application/json
     *     parameters:
     *          - in: path
     *            name: templateID
     *     responses:
     *       200:
     *         description: object of the surveys
     *       401:
     *          description: user must first be logged in
     *       403:
     *          requested template does not belong to requesting user
     *          
     */
    app.get('/api/surveys/template/:id', requireLogin, async (req, res) => {
        const template = await SurveyTemplate.findById(req.params.id);
        if(template.owner !== "global" && template.owner != req.user._id){
            res.status(403).send("Requested template does not belong to requesting user");
        }
        res.send(template);
    });

    /**
     * @swagger
     *
     * /api/surveys/template/{templateID}:
     *   put:
     *     description: updates a survey template
     *     produces:
     *       - application/json
     *     parameters:
     *          - in: path
     *            name: templateID
     *          - in: body
     *            name: template object
     *     responses:
     *       201:
     *         description: updated template
     *       401:
     *          description: user must first be logged in
     *       403:
     *          user does not have access to update given template
     *          
     */
    app.put('/api/surveys/template/:id', requireLogin, async (req, res) => {
        const template = await SurveyTemplate.findById(req.params.id);
        if(template.owner != req.user._id){
            if(template.owner == "global"){
                if(!req.user.isAdmin){
                    res.status(403).send("Must have administrator access to work with global templates");
                }
            }
            else{
                res.status(403).send("Requested template does not belong to requesting user");
            }
        }
        const cleanedSurvey = templateUtils.clearAllIDs(req.body);
        const result = await SurveyTemplate.findByIdAndUpdate(req.body._id,cleanedSurvey);
        res.status(201).send({message: "updated", result: result});
    });

    /**
     * @swagger
     *
     * /api/surveys/template/{templateID}:
     *   delete:
     *     description: deletes a specific survey template
     *     produces:
     *       - application/json
     *     parameters:
     *          - in: path
     *            name: templateID
     *     responses:
     *       204:
     *         description: updated template
     *       401:
     *          description: user must first be logged in
     *       403:
     *          user does not have access to update given template
     *          
     */
    app.delete('/api/surveys/template/:id', requireLogin, async (req, res) => {
        const template = await SurveyTemplate.findById(req.params.id);
        if(template.owner != req.user._id){
            if(template.owner == "global"){
                if(!req.user.isAdmin){
                    res.status(403).send("Must have administrator access to work with global templates");
                }
            }
            else{
                res.status(403).send("Requested template does not belong to requesting user");
            }
        }
        const result = await SurveyTemplate.findByIdAndDelete(req.params.id);
        res.status(204).send(result);
    });

};