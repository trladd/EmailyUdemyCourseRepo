const SurveyFieldSchema = require('./SurveyField');

const mongoose = require('mongoose');
const { Schema } = mongoose;

const surveyTemplateSchema = new Schema({
    name: String,
    description: String,
    defaultIntroText: String,
    owner: String,
    questions: [SurveyFieldSchema],
    addedDate: Date
    
});

mongoose.model('surveyTemplate', surveyTemplateSchema);