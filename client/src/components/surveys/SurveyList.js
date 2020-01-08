import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchSurveys} from '../../actions';
import {Link} from 'react-router-dom';

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
                        return(
                            <div className="card blue-gray darken-1" key={survey._id}>
                                <div className="card-content text-white">
                                    <span className="card-title">{survey.title}</span>
                                    <p>{survey.body}</p>
                                    <p className="right">
                                        Sent On: {new Date(survey.dateSent).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="card-action">
                                    <a>Yes: {survey.yes}</a>
                                    <a>No: {survey.no}</a>
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