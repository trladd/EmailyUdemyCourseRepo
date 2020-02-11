module.exports={
    validateSurveyQuestion: (questionObject)=>{
        let qErrors = [];
        const requiredFields = ["questionText","questionType"];
        
        switch(questionObject.questionType){
            case "input":
                break;
            
            case "textArea":
                    break;
    
            case "boolean":
                    //requiredFields.push("booleanTrueVal");
                    //requiredFields.push("booleanFalseVal");
                    break;
     
            case "classic4":
                    break;
    
            case "classic5":
                    break;
    
            default:
                errors.push("Unknown question type '" + questionObject.questionType + "'");
        
        }
        for(var i = 0; i < requiredFields.length; i++){
            if(!questionObject[requiredFields[i]]){
                errors.push("Missing required question property " + requiredFields[i] + " on question " + i);
            }
        }
        if(qErrors == []){
            return 1;
        }
        else{
            return qErrors;
        }
    }
    ,
    validateSurveyTemplate: (surveyObj, questionsOptional)=>{
        let errors = [];
        if(!surveyObj){
            errors.push("Empty survey object");
            return errors;
        }
        let requiredFields = ["name","description","defaultIntroText"];
        if(!questionsOptional){
            requiredFields.push("questions");
        }
        for(var i = 0; i < requiredFields.length; i++){
            if(!surveyObj[requiredFields[i]]){
                errors.push("Missing main survey property " + requiredFields[i]);
            }
        }
        for(var i = 0; i < surveyObj.questions.length; i++){
            let qResponse = validateSurveyQuestion(surveyObj.questions[i]);
            if(qResponse != 1){
                errors.push(qResponse);
            }
        }
        if(qErrors == []){
            return 1;
        }
        else{
            return errors;
        }
    }
    ,
    /**
     * Clears all IDs (should be used when doing a POST)
     * @param {} surveyObj 
     */
    clearAllIDs: (surveyObj)=>{
        console.log({dirty: JSON.stringify(surveyObj)});
        if(surveyObj._id){
            delete surveyObj._id;
        }
        for(var i = 0; i < surveyObj.questions.length; i++){
            if(surveyObj.questions[i]._id){
                delete surveyObj.questions[i]._id;
            }
        }
        console.log({clean: JSON.stringify(surveyObj)});
        return surveyObj;
    }
    ,
    /**
     * Clears any ID's that are less than 20
     * @param {*} surveyObj 
     */
    cleanIDs: (surveyObj)=>{
        const maxLength = 20;
        if(surveyObj._id){
            if(surveyObj._id.length < maxLength)
            delete surveyObj._id;
        }
        for(var i = 0; i < surveyObj.questions.length; i++){
            if(surveyObj.questions[i]._id){
                if(surveyObj.questions[i].length < maxLength){
                    delete surveyObj.questions[i]._id;
                }
            }
        }
        return surveyObj;
    }
}




