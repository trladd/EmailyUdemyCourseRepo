import React, {Component} from 'react';
import queryString from 'query-string'
import axios from 'axios';
import JSONInput from 'react-json-editor-ajrm';
import locale    from 'react-json-editor-ajrm/locale/en';

    

class CreateSurvey extends Component{
    constructor(){
        super();
        this.state={
            survey: null,
            showJSON: false
        };
        this.updateStateFromEditor = this.updateStateFromEditor.bind(this);
        this.toggleEditor = this.toggleEditor.bind(this);
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

    renderJSONEditor(){
        if(this.state.showJSON){
            return(
                <JSONInput
                    id          = 'a_unique_id'
                    placeholder = { this.state.survey }
                    locale      = { locale }
                    height      = '90%'
                    width       = '100%'
                    onChange = {this.updateStateFromEditor}

                />
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
                <div>
                    <button className="waves-effect waves-light btn blue" onClick={this.toggleEditor}>Toggle JSON Editor</button>
                </div>
                {this.renderJSONEditor()}
                
            </div>
        </div>
    );
    }
}

export default (CreateSurvey);