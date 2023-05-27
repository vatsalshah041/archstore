import { ActionTypes } from "../constants/action-type";

const initialstate={
    lists:[]
}

export const listReducer=(state=initialstate,{type,payload})=>{
    switch(type){
        case ActionTypes.ADD:
            {
                console.log(payload);
            }
        default:
            return state;
    }
}