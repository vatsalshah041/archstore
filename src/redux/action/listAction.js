import { ActionTypes } from "../constants/action-type"
export const add=(list)=>{
    return{
        type:ActionTypes.ADD,
        payload:list,
    }
};
export const filter=(list)=>{
    return{
        type:ActionTypes.FILTER,
        payload:list,
    }
};
export const page=(list)=>{
    return{
        type:ActionTypes.FILTER,
        payload:list,
    }
};