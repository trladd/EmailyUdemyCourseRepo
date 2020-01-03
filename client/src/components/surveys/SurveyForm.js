//shows a form for a user to add input
import _ from 'lodash';
import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {Link} from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component{

    renderFields(){
        return _.map(formFields, ({label,name}) => {
            return <Field key={name} component={SurveyField} type="text" label={label} name={name}/>
        })
    }

    render(){
        return(
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat left white-text">
                        Cancel
                    </Link>
                    <button className="teal btn-flat right white-text" type="submit">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
                
            </div>
        );
    }
}

function validate(values){
    const errors={};

    /*if(!values.title){
        errors.title = 'You must provide a title';
    }
    if(!values.subject){
        errors.subject = 'You must provide a Subject Line';
    }
    if(!values.body){
        errors.body = 'You must provide a Body';
    } BELOW IS A BETTER WAY TO DO THIS...*/
    _.each(formFields, ({name, label}) => {
        if(!values[name]){
            errors[name] = 'You must provide a value for ' + label;
        }
    });
    if(!errors.emails){
        errors.emails = validateEmails(values.emails || '');
    }
 

    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);