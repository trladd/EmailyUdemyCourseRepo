import {FETCH_GLOBAL_TEMPLATES} from '../actions/types';

export default function (state = [], action){
    switch(action.type){
        case FETCH_GLOBAL_TEMPLATES:
            return action.payload;
        default:
            return state;
    }
}