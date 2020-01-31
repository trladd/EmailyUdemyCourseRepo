//Survey field contains logic to redner a single label and text input
import React, {Component} from 'react';

const exampleSurveyField = {
    questionText:"This is an example question",
    questionType:["input", "textArea", "boolean", "classic"],// classic is the 4 tier strongly disagree, disagree, agree, strongly agree
    booleanTrueVal: "Agree",// for boolean questions optional args for boolean text values can be passed
    booleanFalseVal: "Disagree",
    placeholderText: "placeholder text for text area and input fields",
    toolTip: "text for tooltip would go here"
};
class SurveyField extends Component{
    constructor(props){
        super();
    }

    renderInput(){
        const q = this.props.field;
        return(
            <div className="row flow-text">
                <div className="col m12 l6">
                    <span>{q.questionText}</span>
                </div>
                <div className="col m12 l6">
                    <div class="input-field">
                        <input placeholder={q.placeholderText? q.placeholderText:""} id={q._id} type="text" class="validate"/>
                        <label for={q._id}>{q.label}</label>
                    </div>
                </div>
            </div>
        );
    }

    render(){
        switch(this.props.field.questionType){
            case "input":{
                return this.renderInput();
            }
        }
        
    }
};

export default SurveyField;