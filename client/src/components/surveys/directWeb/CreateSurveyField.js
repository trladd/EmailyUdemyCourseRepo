import React, {Component} from 'react';
import _ from 'lodash';
import fieldTypes from './fieldTypes';
import M from "materialize-css/dist/js/materialize.min.js";

class CreateSurveyField extends Component{
    constructor(){
        super();
        
        this.state={
            showAdvanced: false
        };
        this.handleQuestionChange = this.handleQuestionChange.bind(this);
        this.toggleAdvanced = this.toggleAdvanced.bind(this);
        this.renderTypes = this.renderTypes.bind(this);
        this.removeThis = this.removeThis.bind(this);
    }

    componentDidMount(){
        var dropdowns = document.querySelectorAll("select");
        var dropdown = M.FormSelect.init(dropdowns, {
        });
        
    }

    renderTypes(){
        return _.map(fieldTypes, ({type, display}) => {
            return <option key={type} value={type}>{display}</option>
        })
    }

    handleQuestionChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const qObj = this.props.question;
        qObj[name]=value;
        this.props.updateSurvey(qObj);
      }

    renderAdvancedBooleans(){
        if(this.props.question.questionType == "boolean"){
            return(
                <div>
                    <div className="input-field col s12 l6">
                    <label  className="active" htmlFor={this.props.question._id+"btv"}>Boolean True Text</label>
                        <input onChange={this.handleQuestionChange} value={this.props.question.booleanTrueVal?this.props.question.booleanTrueVal:""} id={this.props.question._id+"btv"} name="booleanTrueVal" type="text" className="validate"/>
                        
                    </div>
                    <div className="input-field col s12 l6">
                        <input onChange={this.handleQuestionChange} value={this.props.question.booleanFalseVal?this.props.question.booleanFalseVal:""} id={this.props.question._id+"bfv"} name="booleanFalseVal" type="text" className="validate"/>
                        <label  className="active" htmlFor={this.props.question._id+"bfv"}>Boolean False Text</label>
                    </div>
                </div>
            );
        }
    }

    renderAdvanced(){
        if (document.getElementById(this.props.question._id+"adv") && document.getElementById(this.props.question._id+"adv").checked) {
            return(
                <div>
                    <div className="row">
                    <div className="input-field col s12 l6">
                        <input onChange={this.handleQuestionChange} value={this.props.question.placeholderText} id={this.props.question._id+"pt"} name="placeholderText" type="text" className="validate"/>
                        <label  className="active" htmlFor={this.props.question._id+"pt"}>Placeholder Text</label>
                    </div>
                    {this.renderAdvancedBooleans()}
                    
                
                </div>
                    <div className="row">
                        
                    </div>
                </div>
                
            );
        }
    }

    async toggleAdvanced(){
        if(this.state.showAdvanced){
            await this.setState({showAdvanced: false});
            console.log(this.state);
        }
        await this.setState({showAdvanced: true});
        console.log(this.state);
    }

    removeThis(){
        this.props.removeItem(this.props.question._id);
    }

    render(){
        return(
            <form>
                <div className="row">
                    <div className="input-field col s12 l6">
                        <select name="questionType" value={this.props.question.questionType?this.props.question.questionType:"none"} onChange={this.handleQuestionChange} >
                            <option value="none" disabled defaultValue>Choose question type</option>
                            {this.renderTypes()}
                        </select>
                        <label >Question Type</label>
                    </div>
                    <div className="input-field col s12 l6">
                        <input onChange={this.handleQuestionChange} value={this.props.question.questionText} id={this.props.question._id+"qt"} name="questionText" type="text" className="validate"/>
                        <label className="active"  htmlFor={this.props.question._id+"qt"}>Question Text</label>
                    </div>
                    <label className="active" >
                        <input onChange={this.toggleAdvanced} type="checkbox" id={this.props.question._id+"adv"} name="showAdvanced" />
                        <span>Show Advanced Settings</span>
                    </label>
                    {this.renderAdvanced()}
                </div>
                <div className="row">
                <button className="waves-effect waves-light btn red right" onClick={this.removeThis}>Remove</button>
                </div>
            </form>
        );
    }
}

export default CreateSurveyField;