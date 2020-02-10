import React, {Component} from 'react';
import queryString from 'query-string';
import {Link} from 'react-router-dom';
import axios from 'axios';
import JSONInput from 'react-json-editor-ajrm';
import locale    from 'react-json-editor-ajrm/locale/en';
import Survey from './Survey';
import CreateSurveyField from './CreateSurveyField';
import _ from 'lodash';
import M from "materialize-css/dist/js/materialize.min.js";
import defaultQuestion from './defaultQuestion';
import * as actions from '../../../actions';
import {connect} from 'react-redux';
    

class CreateSurvey extends Component{
    constructor(){
        super();
        this.state={
            survey: null,
            showJSON: false,
            showPreview: true,
            currentTemplateExistsUser: null,
            currentTemplateExistsGlobal: null,
            initializing: true
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
        this.saveToMyTemplates = this.saveToMyTemplates.bind(this);
        this.saveToGlobalTemplates = this.saveToGlobalTemplates.bind(this);
        this.loadModalState = this.loadModalState.bind(this);
        this.clearModalState = this.clearModalState.bind(this);
        this.renderAdminControls = this.renderAdminControls.bind(this);
        this.initModal = this.initModal.bind(this);
        this.deleteSurveyTemplate = this.deleteSurveyTemplate.bind(this);
        this.updateSurveyTemplate = this.updateSurveyTemplate.bind(this);
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
        this.setState({initializing: false});
        this.initModal();
        
    }

    initModal(){
        const modalOptions = {
            onOpenStart: this.loadModalState
            ,
            onOpenEnd: () => {
            },
            onCloseStart: this.clearModalState
            ,
            onCloseEnd: () => {
            },
            inDuration: 250,
            outDuration: 250,
            opacity: 0.5,
            dismissible: true,
            startingTop: "4%",
            endingTop: "10%"
          };
          M.Modal.init(this.Modal, modalOptions);
    }

    async loadModalState(){
        if(this.state.survey._id){
            const databaseRecord = (await axios.get("/api/surveys/template/"+this.state.survey._id)).data;
            if(databaseRecord && databaseRecord._id === this.state.survey._id){
                if(databaseRecord.owner === this.props.auth._id){
                    await this.setState({currentTemplateExistsUser: true, currentTemplateExistsGlobal: false});
                    return;
                }
                if(databaseRecord.owner === "global"){
                    await this.setState({currentTemplateExistsUser: false, currentTemplateExistsGlobal: true});
                    return;
                }
            }
        }
        await this.setState({currentTemplateExistsUser: false, currentTemplateExistsGlobal: false});
    }

    async clearModalState(){
        await this.setState({currentTemplateExistsUser: null, currentTemplateExistsGlobal: null});
    }

    async updateStateFromEditor(newObject){
        if(!newObject.jsObject || newObject.jsObject==="" || newObject.jsObject === undefined){
            newObject.jsObject={};
        }
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
            return item._id !== questionID;
          });
        await this.setState({survey:tempObject});
    }

    renderCommonFields(){
        return(
            <form>
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
            </form>
        );
    }

    async addQuestion(){
        const survey = this.state.survey;
        if(!survey.questions){
            survey.questions=[];
        }
        
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


    saveToMyTemplates(){
        this.props.submitSurveyTemplates(this.state.survey,this.props.history);
    }

    saveToGlobalTemplates(){
        this.props.submitGlobalTemplate(this.state.survey,this.props.history);
    }

    updateSurveyTemplate(){
        this.props.updateSurveyTemplate(this.state.survey,this.props.history);
    }

    deleteSurveyTemplate(){
        this.props.deleteSurveyTemplate(this.state.survey,this.props.history);
    }

    renderAdminControls(){
        if(this.props.auth && this.props.auth.isAdmin){
            if(this.state.currentTemplateExistsGlobal){
                return(
                    <div className="row">
                        <h5>This survey template already exists in global templates</h5>
                        <div className="row">
                            <button className="waves-effect waves-light btn amber darken-3 row" onClick={this.updateSurveyTemplate}>Overwrite Existing Global Template</button>
                        </div>
                        <div className="row">
                            <button className="waves-effect waves-light btn amber darken-3 row" onClick={this.saveToGlobalTemplates}>Save as a New Global Template</button>
                        </div>
                        <div className="row">
                            <button className="waves-effect waves-light btn red row" onClick={this.deleteSurveyTemplate}>Delete Existing Template</button>
                        </div>
                    </div>
                );
            }
            else{
                //render save as new survey
                return(
                    <div className="row">
                        <h5>This survey does not yet exist in global templates</h5>
                        <button className="waves-effect waves-light btn amber darken-3 row" onClick={this.saveToGlobalTemplates}>Save as a NewGlobal Template</button>
                    </div>
                );
            }
        }
        
    }
      
    renderSaveSurveyModal(){
        //NON ADMIN
        if(this.state.currentTemplateExistsUser !== null){
            if(this.state.currentTemplateExistsUser){
                return(
                    <div>
                        <div className="row">
                            <h5>This survey template already exists in your templates</h5>
                            <div className="row">
                                <button className="waves-effect waves-light btn blue" onClick={this.updateSurveyTemplate}>Overwrite Existing Template</button>
                            </div>
                            <div className="row">
                                <button className="waves-effect waves-light btn blue row" onClick={this.saveToMyTemplates}>Save as New Template</button>
                            </div>
                            <div className="row">
                                <button className="waves-effect waves-light btn red row" onClick={this.deleteSurveyTemplate}>Delete Existing Template</button>
                            </div>
                        </div>
                        {this.renderAdminControls()}
                    </div>
                    
                );
            }
            else{
                //render save as new survey
                return(
                    <div>
                        <div className="row">
                            <h5>This survey does not yet exist in your templates</h5>
                            <button className="waves-effect waves-light btn blue row" onClick={this.saveToMyTemplates}>Save as New Template</button>
                        </div>
                        {this.renderAdminControls()}
                    </div>
                );
            }
            
        }
        else{
            return(
                <div className="preloader-wrapper big active">
                    <div className="spinner-layer spinner-blue-only">
                        <div className="circle-clipper left">
                            <div className="circle"></div>
                        </div><div className="gap-patch">
                            <div className="circle"></div>
                        </div><div className="circle-clipper right">
                            <div className="circle"></div>
                        </div>
                    </div>
                </div>
            );
        }
    }

    renderSaveModal(){
        return(
            <div>
                <div
                    ref={Modal => {
                        this.Modal = Modal;
                    }}
                    id="saveSurveyModal"
                    className="modal"
                >
                <div className="modal-content"  style={{textAlign: 'center'}}>
                    {this.renderSaveSurveyModal()}
                </div>
                <div className="modal-footer">
                    
                
                    <a href="#" className="modal-close waves-effect waves-white btn-flat">
                        Close
                    </a>
                </div>
            </div>
            
            </div>
        );
    }

    render(){
        return(
            <div>
                {this.renderInner()}
                {this.renderSaveModal()}
            </div>
            
        );
    }

    renderInner(){
        if(this.state.initializing)
        {
            return(
                <div style={{textAlign: "center"}}>
                    <h3>Loading Template Editor</h3>
                    <div className="preloader-wrapper big active">
                        <div className="spinner-layer spinner-blue-only">
                            <div className="circle-clipper left">
                                <div className="circle"></div>
                            </div><div className="gap-patch">
                                <div className="circle"></div>
                            </div><div className="circle-clipper right">
                                <div className="circle"></div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else{
            return(
                <div>
                    <button className="waves-effect waves-light btn light-green right modal-trigger" data-target="saveSurveyModal" style={{marginRight:10}}>Save Options</button>
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
                    <div className="row">
                        <div className="row">
                            <Link to="/surveys/new/emaily/">
                                <button className="waves-effect waves-light btn light-green right">Continue to Send Survey</button>
                            </Link>
                        </div>
                    </div>
                    
                    
                </div>
                
            );
        }
    
    }
}

function mapStateToProps({globalTemplates, userTemplates, auth}){
    return {globalTemplates, userTemplates, auth}
}

export default connect(mapStateToProps, actions)(CreateSurvey);