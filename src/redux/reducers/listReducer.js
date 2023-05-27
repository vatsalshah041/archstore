import { ActionTypes } from "../constants/action-type";

const initialstate = {
    lists: [],
    page: []
}

export const listReducer = (state = initialstate, { type, payload }) => {
    switch (type) {
        case ActionTypes.ADD:
            {
                // console.log((payload.info.next));
                // console.log((payload.info.next).length);
                // console.log((payload.info.next).slice(47,));
                return { ...state, lists: payload, page: (payload.info.next).slice(47,) };
            }
        case ActionTypes.FILTER:
            {
                console.log(payload);
                
                return { ...state };
            }
        default:
            return state;
    }
}