// SurveyNew shows SurveyForm and surveyForm review
import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class NewSurveyOptions extends Component{
    render(){
        return(
            <div>
                <Link to="/surveys/new/email">Create a new email based survey</Link>
                <Link to="/surveys/new/emaily">Create a new dwa survey</Link>
            </div>
        );
    }
}

export default (NewSurveyOptions);