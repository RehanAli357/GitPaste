import { produce } from "immer"

const initialState = {
    type: "",
    message: ""
}

export const alertReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SHOW_ALERT":
            return produce(state, (draft) => {
                draft.type = action.response.type;
                draft.message = action.response.message;
            })

        case "HIDE_ALERT":
            return produce(state, (draft) => {

                draft.type = "";
                draft.message = "";
            })

        default:
            return state;
    }
}