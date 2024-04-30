import { produce } from "immer"

const initialState = {
    userName: '',
    folder: [],
}

export const fileFolderReducer = (state = initialState, action) => {

    switch (action.type) {
        case "GET_FOLDER":
            return produce(state, (draft) => {
                draft.userName = action.response.userName;
                draft.folder = action.response.folders
            })

        case "UPDATE_FILE":
            let folderIndex = state.folder.findIndex((data) => data.folderName === action.response.folderName);
            let fileIndex = state.folder[folderIndex].files.findIndex((data) => data._id === action.response.fileId);
            return produce(state, (draft) => {
                draft.folder[folderIndex].files[fileIndex].fileName = action.response.fileName;
                draft.folder[folderIndex].files[fileIndex].fileSize = action.response.fileSize;
                draft.folder[folderIndex].files[fileIndex].fileData.data = action.response.fileData;
            })

        case "FILE_SHARE":
            let index = state.folder.findIndex((data) => data.folderName === action.response.folderName);
            let indexFile = state.folder[index].files.findIndex((data) => data._id === action.response.fileId);
            if (indexFile !== -1) {
                return produce(state, (draft) => {
                    draft.folder[index].files[indexFile].fileKey = action.response.linkKey;
                    draft.folder[index].files[indexFile].fileDuration = action.response.duration;
                });
            }

        case "EMPTY_FILE_FOLDER":
            return produce(state, (draft) => {
                draft.files = [];
                draft.folder = [];
                draft.userName = ""
            })


        default:
            return state;
    }

}

