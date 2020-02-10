import axios from 'axios';
import {FETCH_USER, FETCH_SURVEYS, FETCH_GLOBAL_TEMPLATES, FETCH_USER_TEMPLATES, FETCH_ALL_TEMPLATES} from './types';

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

export const submitSurveyTemplates = (surveyObj, history) => async dispatch => {
    const res = await axios.post('/api/surveys/templates/user', surveyObj);
    history.push('/surveys/new/emaily/templates?templates=user');
    dispatch({type: FETCH_USER_TEMPLATES, payload: res.data});
};

export const submitGlobalTemplate = (surveyObj, history) => async dispatch => {
    const res = await axios.post('/api/surveys/templates/global', surveyObj);
    history.push('/surveys/new/emaily/templates?templates=global');
    dispatch({type: FETCH_GLOBAL_TEMPLATES, payload: res.data});
};

export const updateSurveyTemplate = (surveyObj, history) => async dispatch => {
    const res = await axios.put('/api/surveys/template/'+surveyObj._id, surveyObj);
    history.push('/surveys/new/emaily/templates?templates=user');
    dispatch({type: FETCH_ALL_TEMPLATES, payload: res.data});
};

export const deleteSurveyTemplate = (surveyObj, history) => async dispatch => {
    const res = await axios.delete('/api/surveys/template/'+surveyObj._id, surveyObj);
    history.push('/surveys/new/emaily/templates?templates=user');
    dispatch({type: FETCH_ALL_TEMPLATES, payload: res.data});
};

