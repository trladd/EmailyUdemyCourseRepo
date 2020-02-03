import React, {Component} from 'react';
import {Link} from 'react-router-dom';

const cardStyle={
    marginRight: "3px",
    marginLeft: "3px",
    height: "200px"
};

class NewDWSurvey extends Component{
    render(){
        return(
            <div className="row">
                <div className="col s12 m6 l4 xl4">
                    <div className="card z-depth-4" style={cardStyle}>
                        <Link to="/surveys/new/emaily/templates?templates=global">
                            <div className="card-content">
                                <span className="card-title">Create From Global Templates</span>
                                <p>Create a new survey using globally available templates</p>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="col s12 m6 l4 xl4">
                    <div className="card z-depth-4" style={cardStyle}>
                        <Link to="/surveys/new/emaily/templates?templates=user">
                            <div className="card-content">
                                <span className="card-title">Create From My Templates</span>
                                <p>Create a new survey using templates on your account</p>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="col s12 m6 l4 xl4">
                    <div className="card z-depth-4" style={cardStyle}>
                        <Link to="/surveys/new/emaily/create">
                            <div className="card-content">
                                <span className="card-title">Create New Survey Template</span>
                                <p>Create new survey template</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        );
    };
}

export default NewDWSurvey;