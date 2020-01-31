import {FETCH_GLOBAL_TEMPLATES} from '../actions/types';

export default function (state = [], action){
    console.log(action);
    switch(action.type){
        case FETCH_GLOBAL_TEMPLATES:
            console.log("action.payload");
            return action.payload;
        default:
            console.log("state");
            return state;
    }
}