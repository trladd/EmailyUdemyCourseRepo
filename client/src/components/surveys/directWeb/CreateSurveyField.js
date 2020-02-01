import React, {Component} from 'react';
import _ from 'lodash';
import fieldTypes from './fieldTypes';
import M from "materialize-css/dist/js/materialize.min.js";

class CreateSurveyField extends Component{
    constructor(){
        super();
        console.log(this.props);
    }

    componentDidMount(){
        var dropdowns = document.querySelectorAll("select");
        var dropdown = M.FormSelect.init(dropdowns, {
        });
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    renderTypes(){
        return _.map(fieldTypes, ({type, display}) => {
            return <option key={type} value={type}>{display}</option>
        })
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const qObj = this.props.question;
        qObj[name]=value;
        this.props.updateSurvey(qObj);
      }

    render(){
        return(
            <div className="row">
                <div className="input-field col s12">
                    <select name="questionType" onChange={this.handleInputChange} >
                        <option value="none" disabled defaultValue>Choose question type</option>
                        {this.renderTypes()}
                    </select>
                    <label>Question Type</label>
                </div>
            </div>
        );
    }
}

export default CreateSurveyField;