import { ActionTypes } from "../constants/action-type";

const initialstate = {
    lists: [],
    filterlist:[],
    page: []
}

export const listReducer = (state = initialstate, { type, payload }) => {
    switch (type) {
        case ActionTypes.ADD:
            {
                // console.log((payload.info.next));
                // console.log((payload.info.next).length);
                // console.log((payload.info.next).slice(47,));
                //console.log(page);
                return { ...state, lists: payload, page: (payload.info.next).slice(47,) };
            }
        case ActionTypes.FILTER:
            {
                console.log(payload);
                let filtlist=state.lists.results;
                if(payload.name!="")
                {
                    console.log("name");
                    filtlist = (filtlist).filter(
                        (list) => list.name.toLowerCase().includes((payload.name).toLowerCase().trim())
                    );
                }
                if(payload.gender!="")
                {
                    console.log("gender");
                    filtlist = (filtlist).filter(
                        (list) => list.gender.includes((payload.gender).trim())
                    );
                }
                if(payload.status!="")
                {
                    console.log("status");
                    filtlist = (filtlist).filter(
                        (list) => list.status.toLowerCase().includes((payload.status).toLowerCase().trim())
                    );
                }
                console.log(filtlist)
                return { ...state ,filterlist:filtlist};
            }
        case ActionTypes.PAGE:
            {
                
            }
        default:
            return state;
    }
}