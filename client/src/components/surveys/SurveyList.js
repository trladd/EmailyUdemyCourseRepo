import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchSurveys} from '../../actions';
import {Link} from 'react-router-dom';
import {Pie} from 'react-chartjs-2';

class SurveyList extends Component{
    componentDidMount(){
        this.props.fetchSurveys();
    }

    renderSurveys(){
        console.log(this.props.surveys);
        switch (this.props.surveys.length){
            case null:
                return;
            case (0):
                return (
                <div className="card blue-gray darken-1" key="noSurveys">
                    <div className="card-content text-white">
                        <span className="card-title">No Surveys Created</span>
                        <p>You have not created any surveys. When you do, you will see a list of your surveys appear here.</p>
                        <p>By default, we have granted you two credits to try our app before having to pay. This will allow you to send two surveys!</p>
                        <Link to="/surveys/new" className="waves-effect waves-light btn blue">
                        Create One Now
                        </Link>
                    </div>
                </div>);
    
            default:
                    return this.props.surveys.reverse().map(survey => {
                        console.log("In the map");
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