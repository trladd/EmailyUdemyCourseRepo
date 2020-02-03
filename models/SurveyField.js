const mongoose = require('mongoose');
const {Schema} = mongoose;

const surveyFieldSchema = new Schema({
    questionText: String,
    questionType: String,
    booleanTrueVal: String,
    booleanFalseVal: String,
    placeholderText: String,
    toolTip: String,
    required: Boolean
});

module.exports = surveyFieldSchema;