// SurveyNew shows SurveyForm and surveyForm review
import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component{
    /*constructor(props){
        super(props);

        this.state = {new: true};
    } below line is equivalent to the above for iniitializing state*/
    state = { showFormReview: false};

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
})(SurveyNew);