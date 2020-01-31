import React, {Component} from 'react';
import queryString from 'query-string'
import axios from 'axios';

class CreateSurvey extends Component{
    constructor(){
        super();
        this.state={
            survey: null
        };
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
            this.setState({survey: "put an empty template here"});
        }
        
    }
    render(){
    return(<div>{JSON.stringify(this.state.survey)}</div>);
    }
}

export default (CreateSurvey);