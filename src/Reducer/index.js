import { combineReducers } from "redux";
import { userReducer } from "../Reducer/userReducer"
import { fileFolderReducer } from "./fileFolderReducer";
import { alertReducer } from "./alertReducer";
export const rootReducer = combineReducers({
    user: userReducer,
    fileFolder:fileFolderReducer,
    alert:alertReducer
});

export default rootReducer;
