import React, {Component} from 'react';
import queryString from 'query-string'
import axios from 'axios';
import JSONInput from 'react-json-editor-ajrm';
import locale    from 'react-json-editor-ajrm/locale/en';
import Survey from './Survey';

    

class CreateSurvey extends Component{
    constructor(){
        super();
        this.state={
            survey: null,
            showJSON: true,
            showPreview: true
        };
        this.updateStateFromEditor = this.updateStateFromEditor.bind(this);
        this.toggleEditor = this.toggleEditor.bind(this);
        this.togglePreview = this.togglePreview.bind(this);
    }

    async componentDidMount(){
        this.state={
            survey: null
        };
        const queryParams = queryString.parse(this.props.location.search);
        if(queryParams.template){
              const response  = await axios.get("/api/surveys/template/" + queryParams.template);
              console.log(response.data);
              this.setState({survey: response.data});
        }
        else{
            this.setState({survey: {message: "empty survey"}});
        }
        
    }

    async updateStateFromEditor(newObject){
        await this.setState({survey: newObject.jsObject});
    }

    toggleEditor(){
        console.log(this.state);
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
        if(this.state.showJSON){
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



    render(){
    return(
        <div>
            <div>
                <label>Survey Name</label><br></br>
                <span>{this.state.survey && this.state.survey.name ? this.state.survey.name : "N/A"}</span>
            </div>
            <div>
                <div className="row">
                    <button className="waves-effect waves-light btn blue col m6" onClick={this.toggleEditor}>Toggle JSON Editor</button>
                    <button className="waves-effect waves-light btn blue col m6" onClick={this.togglePreview}>Toggle Survey Preview</button>
                </div>
                <div className="row">
                    <div className="col m6">
                        {this.renderJSONEditor()}
                    </div>
                    <div className="col m6">
                        {this.renderPreview()}
                    </div>
                </div>
                
                
            </div>
        </div>
    );
    }
}

export default (CreateSurvey);