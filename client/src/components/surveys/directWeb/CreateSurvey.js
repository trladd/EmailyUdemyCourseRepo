import React, {Component} from 'react';
import queryString from 'query-string'
import axios from 'axios';
import JSONInput from 'react-json-editor-ajrm';
import locale    from 'react-json-editor-ajrm/locale/en';
import Survey from './Survey';
import CreateSurveyField from './CreateSurveyField';
import _ from 'lodash';
import M from "materialize-css/dist/js/materialize.min.js";
import defaultQuestion from './defaultQuestion';

    

class CreateSurvey extends Component{
    constructor(){
        super();
        this.state={
            survey: null,
            showJSON: false,
            showPreview: true
        };
        this.updateStateFromEditor = this.updateStateFromEditor.bind(this);
        this.toggleJSONEditor = this.toggleJSONEditor.bind(this);
        this.togglePreview = this.togglePreview.bind(this);
        this.updateQuestion = this.updateQuestion.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.renderQuestionFields = this.renderQuestionFields.bind(this);
        this.renderCommonFields = this.renderCommonFields.bind(this);
        this.removeQuestion = this.removeQuestion.bind(this);
    }

    async componentDidMount(){
        this.state={
            survey: null
        };
        const queryParams = queryString.parse(this.props.location.search);
        if(queryParams.template){
              const response  = await axios.get("/api/surveys/template/" + queryParams.template);
              this.setState({survey: response.data});
        }
        else{
            this.setState({survey: {message: "empty survey"}});
        }
        
    }

    async updateStateFromEditor(newObject){
        await this.setState({survey: newObject.jsObject});
    }

    toggleJSONEditor(){
        if(this.state.showJSON){
            this.setState({showJSON: false});
        }
        else{
            this.setState({showJSON: true});
        }
    }

    togglePreview(){
        if(this.state.showPreview){
            this.setState({showPreview: false});
        }
        else{
            this.setState({showPreview: true});
        }
    }

    renderJSONEditor(){
        return(
            <JSONInput
                id          = 'a_unique_id'
                placeholder = { this.state.survey }
                locale      = { locale }
                height      = '100%'
                width       = '100%'
                onChange = {this.updateStateFromEditor}

            />
        );
    }

    /**
     * 
     * @param {*} questionObject 
     */
    updateQuestion(questionObject){
        const indexToUpdate = _.findIndex(this.state.survey.questions, {_id:questionObject._id});
        const tempObject = this.state.survey;
        tempObject.questions[indexToUpdate] = questionObject;
        this.setState({survey:tempObject});
    }

    async removeQuestion(questionID){
        const tempObject = this.state.survey;
        tempObject.questions = _.remove(tempObject.questions, (item) => {
            return item._id != questionID;
          });
        await this.setState({survey:tempObject});
    }

    renderCommonFields(){
        return(
            <div>
                <div className="input-field col s12 l6">
                    <input onChange={this.handleInputChange} value={this.state.survey?this.state.survey.name:""} id="surveyName" name="name" type="text" className="validate"/>
                    <label className="active"  htmlFor="surveyName">Survey Name</label>
                </div>
                <div className="input-field col s12">
                    <textarea onChange={this.handleInputChange} value={this.state.survey?this.state.survey.description:""} id="surveyDesciption" name="description" type="text" className="materialize-textarea"/>
                    <label className="active"  htmlFor="surveyDesciption">Description</label>
                </div>
                <div className="input-field col s12">
                    <textarea onChange={this.handleInputChange} value={this.state.survey?this.state.survey.defaultIntroText:""} id="defaultIntroText" name="defaultIntroText" type="text" className="materialize-textarea"/>
                    <label className="active"  htmlFor="defaultIntroText">Intro Text</label>
                </div>
            </div>
        );
    }

    async addQuestion(){
        const survey = this.state.survey;
        survey.questions.push(_.clone(defaultQuestion));
        survey.questions[survey.questions.length-1]._id = this.state.survey.questions.length;
        await this.setState({survey});
    }

    renderQuestionFields(){
        if(!this.state.survey || !this.state.survey.questions || this.state.survey.questions.length === 0){
            return(<li className="redText">No questions added yet</li>);
        }
        return this.state.survey.questions.map(questionItem => {
            return(
                <li className="collection-item" key={questionItem._id}>
                    <h5>Question {_.findIndex(this.state.survey.questions, {_id:questionItem._id})+1}</h5>
                    <CreateSurveyField question={questionItem} updateSurvey={this.updateQuestion} removeItem={this.removeQuestion}/>
                </li>
            );
        });

    }

    renderGUIEditor(){
        return(
            <div>
                <div className="row">
                    {this.renderCommonFields()}
                </div>
                <div className="row">
                    <ul className="collection">
                        {this.renderQuestionFields()}
                    </ul>
                    <button className="waves-effect waves-light btn blue" onClick={this.addQuestion}>
                        Add Question
                    </button>
                </div>
            </div>
        );
        
    }

    renderPreview(){
        if(this.state.showPreview){
            return(
                <div className="z-depth-5">
                    <div className="container">
                        <Survey surveyData={this.state.survey} disabled={true}/>
                    </div>
                </div>
            );
        }
    }

    renderEditPane(){
        if(this.state.showJSON){
            return(
                <div>
                    {this.renderJSONEditor()}
                </div>
            );
            
        }
        else{
            return(
                <div>
                    {this.renderGUIEditor()}
                </div>
            );
        }
        
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const temp = this.state.survey;
        temp[name]=value;
        this.setState({survey:temp});
      }

    render(){
    return(
        <div>
            <div>
                <label>Survey Name</label><br></br>
                <span>{this.state.survey && this.state.survey.name ? this.state.survey.name : "N/A"}</span>
            </div>
            <div>
                <div className="row">
                    <button className="waves-effect waves-light btn blue col m6" onClick={this.toggleJSONEditor}>Toggle JSON Editor</button>
                    <button className="waves-effect waves-light btn blue col m6" onClick={this.togglePreview}>Toggle Survey Preview</button>
                </div>
                <div className="row">
                    <div className="col s12 m6">
                        {this.renderEditPane()}
                    </div>
                    <div className="col s12 m6">
                        {this.renderPreview()}
                    </div>
                </div>
                
                
            </div>
        </div>
    );
    }
}

export default (CreateSurvey);