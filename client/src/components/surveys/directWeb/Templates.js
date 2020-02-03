import React, {Component} from 'react';
import {fetchGlobalSurveyTemplates, fetchUserSurveyTemplates} from '../../../actions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import queryString from 'query-string';


const cardStyle={
    marginRight: "3px",
    marginLeft: "3px",
    height: "300px"
};

class Templates extends Component{
    constructor(){
        super();
        
    }

    async componentDidMount(){
        const queryParams = queryString.parse(this.props.location.search);
        if(queryParams.templates && queryParams.templates == "user"){
            await this.props.fetchUserSurveyTemplates();
            await this.setState({templates:this.props.userTemplates, templateType:"User"});
            console.log('user');
        }
        else{
            await this.props.fetchGlobalSurveyTemplates();
            await this.setState({templates:this.props.globalTemplates, templateType:"Global"});
            console.log("global");
        }
        
        console.log(this);
        
    }
    renderTemplates(){
        if(this.state && this.state.templates){
            switch (this.state.templates.length){
                case null:
                    return;
                case (0):
                    return (
                    <div className="card blue-gray darken-1 flow-text" key="noSurveys">
                        <div className="card-content text-white">
                            <span className="card-title">No Templates Found</span>
                            <Link to="/surveys/new/emaily/create" className="waves-effect waves-light btn blue right">Create New Template Now</Link>
                        </div>
                    </div>);
        
                default:
                    return this.state.templates.reverse().map(template => {
                        var createReference = {pathname: "/surveys/new/emaily/create",
                                            search: "?template=" + template._id};
                        return(
                            <div className="col s12 m6 l4 xl4">
                                <Link
                                        to={createReference}
                                    >
                                <div className="card z-depth-4" style={cardStyle}>
                                    
                                        <div className="card-content">
                                            <span className="card-title">{template.name}</span>
                                            <p><b>Description: </b>{template.description}</p>                                        </div>
                                    
                                </div>
                                </Link>
                            </div>
                        );
                    });
            }
        }
        
        
    }

    render(){
        return(
            <div>
                <h4>{this.state?this.state.templateType:""} Templates</h4>
                <div className="row">
                    {this.renderTemplates()}
                </div>
            </div>
            
        );
    }
}


function mapStateToProps({globalTemplates, userTemplates}){
    return {globalTemplates, userTemplates}
}

export default connect(mapStateToProps, {fetchUserSurveyTemplates,fetchGlobalSurveyTemplates})(Templates);