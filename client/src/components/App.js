import React, {Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';
import About from './About';


class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render(){
        return (
            <div className="grey lighten-4">
                <div className= "container">
                    <BrowserRouter>
                        <div>
                            <Header/>
                            <Route exact path="/" component={Landing} />
                            <Route exact path="/surveys" component={Dashboard} />
                            <Route path="/surveys/new" component={SurveyNew} />
                            <Route path="/about" component={About} />
                        </div>
                    </BrowserRouter>
                </div>
            </div>
        );
    };
    }
export default connect(null, actions)(App);