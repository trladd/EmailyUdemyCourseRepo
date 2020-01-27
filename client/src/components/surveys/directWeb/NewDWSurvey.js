import React, {Component} from 'react';

const cardStyle={
    marginRight: "3px",
    marginLeft: "3px"
};

class NewDWSurvey extends Component{
    render(){
        return(
            <div className="row flow-text">
                <div className="col s12 m6 l4 xl4">
                    <div className="card z-depth-4" style={cardStyle}>
                        <div className="card-content">
                            <span className="card-title">Create From Global Templates</span>
                            <p>Create a new survey using globally available templates</p>
                        </div>
                    </div>
                </div>
                <div className="col s12 m6 l4 xl4">
                    <div className="card z-depth-4" style={cardStyle}>
                        <div className="card-content">
                            <span className="card-title">Create From My Templates</span>
                            <p>Create a new survey using templates on your account</p>
                        </div>
                    </div>
                </div>
                <div className="col s12 m6 l4 xl4">
                    <div className="card z-depth-4" style={cardStyle}>
                        <div className="card-content">
                            <span className="card-title">Create New Survey Template</span>
                            <p>Create new survey template</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default NewDWSurvey;