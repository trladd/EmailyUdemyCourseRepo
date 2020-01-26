// SurveyNew shows SurveyForm and surveyForm review
import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';
import M from "materialize-css/dist/js/materialize.min.js";

class NewEmailSurvey extends Component{
    /*constructor(props){
        super(props);

        this.state = {new: true};
    } below line is equivalent to the above for iniitializing state*/
    state = { showFormReview: false};

    componentDidMount(){
        var elem2 = document.querySelectorAll(".tooltipped");
        var toolTips = M.Tooltip.init(elem2, {
            exitDelay: 0,
            enterDelay: 200,
            margin: 0,
            html: null,
            inDuration: 200,
            outDuration: 500,
            position: "bottom",
            transitionMovement: 0
        });
        
    }

    renderContent(){
        if (this.state.showFormReview){
            return <SurveyFormReview
                onCancel={() => this.setState({showFormReview: false})}
            />
        }
        return <SurveyForm onSurveySubmit={() => this.setState({showFormReview: true})}/>
    }

    render(){
        return(
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

export default reduxForm({
    form: 'surveyForm'
})(NewEmailSurvey);