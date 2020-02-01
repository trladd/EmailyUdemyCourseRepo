import React, {Component} from 'react';
import queryString from 'query-string'
import axios from 'axios';
import JSONInput from 'react-json-editor-ajrm';
import locale    from 'react-json-editor-ajrm/locale/en';
import Survey from './Survey';
import CreateSurveyField from './CreateSurveyField';
import _ from 'lodash';
import M from "materialize-css/dist/js/materialize.min.js";

    

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
        console.log(questionObject);
        const indexToUpdate = _.findIndex(this.state.survey.questions, {_id:questionObject._id});
        const tempObject = this.state.survey;
        tempObject.questions[indexToUpdate] = questionObject;
        this.setState({survey:tempObject});
        console.log(this.state);
    }

    renderCommonFields(){

    }

    renderQuestionFields(){
        if(!this.state.survey || !this.state.survey.questions || this.state.survey.questions.length === 0){
            return(<div>No questions added yet</div>);
        }
        return this.state.survey.questions.map(questionItem => {
            console.log(questionItem);
            return(
                <li key={questionItem._id}>
                    <CreateSurveyField question={questionItem} updateSurvey={this.updateQuestion}/>
                </li>
            );
        });

    }

    renderGUIEditor(){
        return(
            <div>
                <div>
                    {this.renderCommonFields()}
                </div>
                <div>
                    <ul>
                        {this.renderQuestionFields()}
                    </ul>
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