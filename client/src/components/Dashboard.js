import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import SurveyList from './surveys/SurveyList';
import M from "materialize-css/dist/js/materialize.min.js";


class Dashboard extends Component {
    componentDidMount(){
        var elem = document.querySelector(".fixed-action-btn");
        var instance2 = M.FloatingActionButton.init(elem, {
            direction: "buttom",
            hoverEnabled: true,
            toolbarEnabled: false
        });
        var elem2 = document.querySelectorAll(".tooltipped");
        var toolTips = M.Tooltip.init(elem2, {
            exitDelay: 200,
            enterDelay: 0,
            margin: 0,
            inDuration: 400,
            outDuration: 1000,
            position: "left",
            transitionMovement: 0
        });
        
    }

    

    render(){
        return (
            <div>
                <SurveyList/>
                <div className="fixed-action-btn flow-text">
                    <a id="addMenu" className="btn-floating btn-large blue">
                        <i className="material-icons">add</i>
                    </a>
                    <ul>
                        <li className="tooltipped" data-tooltip="Create new email based survey">
                            <Link to="/surveys/new/email" className="btn-floating blue" >
                                <i className="material-icons">email</i>
                            </Link>
                        </li>
                        <li className="tooltipped" data-tooltip="Create new direct web survey">
                            <Link to="/surveys/new/emaily" className="btn-floating blue">
                                <i className="material-icons">web</i>
                            </Link>
                        </li>
                    </ul>
                    
                </div>
                
            </div>
            
        );
    }
    
    
};

export default Dashboard;