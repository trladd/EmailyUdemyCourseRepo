import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchSurveys} from '../../actions';
import {Link} from 'react-router-dom';
import {Pie} from 'react-chartjs-2';
import M from "materialize-css/dist/js/materialize.min.js";

class SurveyList extends Component{
    componentDidMount(){
        this.props.fetchSurveys();
        if(this.props.surveys.length === 0){
            var featureDiscovery = document.querySelector(".tap-target");
            var tapTarget1 = M.TapTarget.init(featureDiscovery, {
                onOpen:()=>{},
                onClose:()=>{}
            });
            tapTarget1.open();
        }
        
    }

    renderSurveys(){
        switch (this.props.surveys.length){
            case null:
                return;
            case (0):
                return (
                <div className="card blue-gray darken-1 flow-text" key="noSurveys">
                    <div className="card-content text-white">
                        <span className="card-title">No Surveys Created</span>
                    </div>
                    <div class="tap-target blue lighten-1" data-target="addMenu">
                    <div class="tap-target-content white-text">
                        <h5>Create a Survey!</h5>
                        <p>You have not created a survey yet. To do so, click here to add a new survey. You can add email based surveys, or direct web link surveys that allow for more flexibility.</p>
                    </div>
                </div>
                </div>);
    
            default:
                    return this.props.surveys.reverse().map(survey => {
                        const pieData = {
                            labels: [
                                'Yes',
                                'No'
                            ],
                            datasets: [{
                                data: [survey.yes, survey.no],
                                backgroundColor: [
                                '#81c784',
                                '#d32f2f '
                                ],
                                hoverBackgroundColor: [
                                '#c8e6c9',
                                '#e57373'
                                ]
                            }]
                        };
                        return(
                            <div className="float-text card horizontal blue-gray darken-1" key={survey._id}>
                                <div class="card-image">
                                <Pie 
                                            data={pieData}
                                            width={160}
                                            height={160}
                                            options={{
                                                maintainAspectRatio: false
                                            }}
                                        />
                                </div>
                                <div className="card-content text-white">
                                    <span className="card-title">{survey.title}</span>
                                    <div className="row">
                                        <div className="col s6">
                                            <p>Email Subject: {survey.subject}</p>
                                            <p>Email Body: {survey.body}</p>
                                        </div>
                                        
                                        <div className="col s6">
                                            <p>
                                                Sent On: {new Date(survey.dateSent).toLocaleDateString()}
                                            </p>
                                            <p>
                                                Last Response: {new Date(survey.lastResponded).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    
                                    
                                    
                                </div>
                                
                                <div className="col3">
                                        
                                    </div>
                            </div> 
                        );
                    });
        }
        
    }

    render(){
        return(
            <div>
                {this.renderSurveys()}
            </div>
        );
    }
}

function mapStateToProps({surveys}){
    return {surveys}
}

export default connect(mapStateToProps, {fetchSurveys})(SurveyList);