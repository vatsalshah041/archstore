import { ActionTypes } from "../constants/action-type"
export const add=(list)=>{
    return{
        type:ActionTypes.ADD,
        payload:list,
    }
};