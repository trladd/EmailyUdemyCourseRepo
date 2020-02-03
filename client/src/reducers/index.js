import {combineReducers} from 'redux';
import {reducer as reduxForm} from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';
import globalTemplatesReducer from './globalSurveyTemplateReducer';
import userTemplatesReducer from './userSurveyTemplateReducer';

export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    surveys: surveysReducer,
    globalTemplates: globalTemplatesReducer,
    userTemplates: userTemplatesReducer
});