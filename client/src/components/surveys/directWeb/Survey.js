import React, {Component} from 'react';
import SurveyField from './SurveyField';

class Survey extends Component{
    constructor(){
        super();
        this.state={
            disabled: true
        };
    }

renderQuestions(){
    if(!this.props.surveyData || !this.props.surveyData.questions
        || this.props.surveyData.questions.length === 0){
        return (
            <div className="card blue-gray darken-1 flow-text" key="noSurveys">
                <div className="card-content text-white">
                    <span className="card-title">No questions</span>
                    <span className>The survey you are attempting to view has not yet had any surveys added</span>
                </div>
            </div>);
    }
    
    return this.props.surveyData.questions.map(question => {
        return(
            <li>
                <SurveyField field={question}/>
            </li>
        );
    });
    
}

    render(){
        return(
            <div>
                <div className="flow-text">
                    <h4>{this.props.surveyData && this.props.surveyData.name? this.props.surveyData.name: ""}</h4>
                    <p>{this.props.surveyData && this.props.surveyData.defaultIntroText ?  this.props.surveyData.defaultIntroText: ""}</p>
                </div>
                <div>
                    <ul>
                        {this.renderQuestions()}
                    </ul>
                </div>
            </div>
            
        );
    }
}

export default Survey;