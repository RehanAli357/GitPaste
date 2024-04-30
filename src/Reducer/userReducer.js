import { produce } from "immer"
const initialState = {
    name: '',
    password: '',
    storage: '',
    left: '',
    token: ''
}


export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_USER_DATA":
            return produce(state, (draft) => {
                draft.name = action.data.name;
                draft.password = action.data.password;
                draft.storage = action.data.storage;
                draft.left = action.data.left;
                draft.token = action.data.token;
            });

        case "LOGOUT_USER":
            return produce(state, (draft) => {
                draft.name = "";
                draft.password = "";
                draft.storage = "";
                draft.left = "";
                draft.token = "";
            })
        default: return state;
    }
}



