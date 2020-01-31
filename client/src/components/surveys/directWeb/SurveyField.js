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
        
    }

    renderInput(){
        return(
            <div className="row">
                <div className="col m9">
                    <span>this.props.field.</span>
                </div>
                <div className="col m3">
                    <input {...input} style={{marginBottom:'5px'}} className="tooltipped"  data-tooltip={toolTip}/>
                    <div className="red-text" style={{marginBottom: '20px'}}>
                        {touched && error}
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
export default({input, label, toolTip, meta:{error, touched}}) => {
    
};