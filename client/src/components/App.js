import React, {Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNewHeader from './surveys/SurveyNewHeader'
import NewEmailSurvey from './surveys/NewEmailSurvey';
import NewSurveyOptions from './surveys/NewSurveyOptions';
import NewDWSurvey from './surveys/directWeb/NewDWSurvey';
import GlobalTemplates from './surveys/directWeb/GlobalTemplates';
import CreateSurvey from './surveys/directWeb/CreateSurvey';
import About from './About';
import Account from './account/AccountSettingsPage';
import Thanks from './Thanks';

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render(){
        return (
            <div>
                <div className= "container">
                    <BrowserRouter>
                        <div>
                            <Header/>
                            <Route exact path="/" component={Landing} />
                            <Route exact path="/surveys" component={Dashboard} />
                            <Route path="/surveys/new" component={SurveyNewHeader} />
                            <Route exact path="/surveys/new" component={NewSurveyOptions} />
                            <Route exact path="/surveys/new/email" component={NewEmailSurvey} />
                            <Route exact path="/surveys/new/emaily" component={NewDWSurvey} />
                            <Route exact path="/surveys/new/emaily/templates/global" component={GlobalTemplates} />
                            <Route path="/surveys/new/emaily/create" component={CreateSurvey} />
                            <Route path="/about" component={About} />
                            <Route path="/account" component={Account}/>
                            <Route path="/thanks" component={Thanks}/>
                        </div>
                    </BrowserRouter>
                </div>
            </div>
        );
    };
    }
export default connect(null, actions)(App);