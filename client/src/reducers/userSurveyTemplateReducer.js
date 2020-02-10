import {FETCH_USER_TEMPLATES, FETCH_ALL_TEMPLATES} from '../actions/types';

export default function (state = [], action){
    switch(action.type){
        case FETCH_USER_TEMPLATES:
            return action.payload;
        case FETCH_ALL_TEMPLATES:
            return action.payload;
        default:
            return state;
    }
}