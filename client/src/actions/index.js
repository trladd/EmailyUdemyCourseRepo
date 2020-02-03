import axios from 'axios';
import {FETCH_USER, FETCH_SURVEYS, FETCH_GLOBAL_TEMPLATES, FETCH_USER_TEMPLATES} from './types';

/**
 * Using redux thunk this is an action creator
 
export const fetchUser = () => {
    return function(dispatch){
        axios
            .get('api/current_user')
            .then(res => dispatch({type: FETCH_USER, payload: res}));
    };
    

};*/
export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({type: FETCH_USER, payload: res.data});
};

export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe', token);
    dispatch({type: FETCH_USER, payload: res.data});
};

export const submitSurvey = (values, history) => async dispatch => {
    const res = await axios.post('/api/surveys', values);
    history.push('/surveys');
    dispatch({type: FETCH_USER, payload: res.data});
};

export const fetchSurveys = () => async dispatch => {
    const res = await axios.get('/api/surveys');
    dispatch({type: FETCH_SURVEYS, payload: res.data});
};

export const fetchGlobalSurveyTemplates = () => async dispatch => {
    const res = await axios.get('/api/surveys/templates/global');
    dispatch({type: FETCH_GLOBAL_TEMPLATES, payload: res.data});
};

export const fetchUserSurveyTemplates = () => async dispatch => {
    const res = await axios.get('/api/surveys/templates/user');
    dispatch({type: FETCH_USER_TEMPLATES, payload: res.data});
};
