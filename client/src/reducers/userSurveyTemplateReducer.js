import {FETCH_USER_TEMPLATES} from '../actions/types';

export default function (state = [], action){
    switch(action.type){
        case FETCH_USER_TEMPLATES:
            return action.payload;
        default:
            return state;
    }
}