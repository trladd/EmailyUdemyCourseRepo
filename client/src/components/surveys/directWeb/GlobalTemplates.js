import React, {Component} from 'react';
import {fetchGlobalSurveyTemplates} from '../../../actions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const cardStyle={
    marginRight: "3px",
    marginLeft: "3px",
    height: "300px"
};

class GlobalTemplates extends Component{
    componentDidMount(){
        this.props.fetchGlobalSurveyTemplates();
    }
    renderTemplates(){
        switch (this.props.globalTemplates.length){
            case null:
                return;
            case (0):
                return (
                <div className="card blue-gray darken-1 flow-text" key="noSurveys">
                    <div className="card-content text-white">
                        <span className="card-title">No Templates Found</span>
                    </div>
                </div>);
    
            default:
                    return this.props.globalTemplates.reverse().map(template => {
                        var thisReference = {pathname: "/surveys/new/emaily/create",
                                            search: "?template=" + template._id};
                        return(
                            <div className="col s12 m6 l4 xl4">
                                <div className="card z-depth-4" style={cardStyle}>
                                    <Link
                                        to={thisReference}
                                    >
                                        <div className="card-content">
                                            <span className="card-title">{template.name}</span>
                                            <p><b>Description: </b>{template.description}</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        );
                    });
        }
        
    }

    render(){
        return(
            <div className="row">
                {this.renderTemplates()}
            </div>
        );
    }
}


function mapStateToProps({globalTemplates}){
    return {globalTemplates}
}

export default connect(mapStateToProps, {fetchGlobalSurveyTemplates})(GlobalTemplates);