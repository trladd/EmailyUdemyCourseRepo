import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class SurveyNewHeader extends Component{

    render(){
        return(
            <div style={{marginTop: "20px", marginBottom: "20px"}}>
                <Link to="/surveys" className="waves-effect waves-light btn blue">Return to Surveys</Link>
            </div>
        );
        
    }
};

export default SurveyNewHeader;