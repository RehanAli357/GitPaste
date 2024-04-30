import commonAxios from "../CommonAxios/commonAxios"

export const getFolderData = (ep, method, data) => async (dispatch) => {
    commonAxios(ep, method, data).then((data) => {
        if (data.data.status) {
            dispatch({
                type: "GET_FOLDER",
                response: {
                    userName: data.data.data.userName,
                    folders: data.data.data.folders
                }
            })
            dispatch({
                type: "SHOW_ALERT",
                response: {
                    type: "SUCCESS",
                    message: data.data.message
                }
            })
        } else {
            dispatch({
                type: "SHOW_ALERT",
                response: {
                    type: "DANGER",
                    message: data.data.message
                }
            })
        }
    }).catch((error) => {
        console.log(error)
    })
}

export const uploadFile = (ep, method, data) => async (dispatch) => {
    const username = [...data.entries()]
    commonAxios(ep, method, data).then((data) => {
        if (data.data.status) {
            dispatch({
                type: "SHOW_ALERT",
                response: {
                    type: "SUCCESS",
                    message: data.data.message
                }
            })
            dispatch(getFolderData('get-files&folder', 'POST', { userName: username[2][1] }))
        } else {
            dispatch({
                type: "SHOW_ALERT",
                response: {
                    type: "DANGER",
                    message: data.data.message
                }
            })
        }
    }).catch((error) => {
        console.log(error)
    })
}
export const shareFile = (ep, type, data, setShow, id) => (dispatch) => {
    commonAxios(ep, type, data).then((data) => {
        if (data.data.status) {
            dispatch({
                type: "FILE_SHARE",
                response: {
                    linkKey: data.data.linkKey,
                    duration: data.data.duration,
                    folderName: JSON.parse(data.config.data).folderName,
                    fileId: JSON.parse(data.config.data).fileId
                }
            })
            dispatch({
                type: "SHOW_ALERT",
                response: {
                    type: "SUCCESS",
                    message: data.data.message
                }
            })
            const element = document.getElementsByClassName(id)[0];

            if (element) {
                element.style.backgroundColor = "blue";
                navigator.clipboard.writeText(element.innerText)
                    .catch((err) => {
                        console.error('Error copying text to clipboard:', err);
                    });
            } else {
                console.log('Element with the specified class name not found');
            }
            setShow(id)
            setTimeout(() => {
                setShow("")
                document.getElementsByClassName(id)[0].style.backgroundColor = "transparent"
            }, 3500);
        } else {
            dispatch({
                type: "SHOW_ALERT",
                response: {
                    type: "DANGER",
                    message: data.data.message
                }
            })
        }
    }).catch((error) => {
        console.log(error)
    })
}

export const updateFileData = (ep, method, data) => async (dispatch) => {
    const obj = {}
    for (const [key, value] of data.entries()) {
        obj[key] = value
    }
    const file = data.get("file");
    const fileBuffer = await file.arrayBuffer()
    commonAxios(ep, method, data).then((data) => {
        if (data.data.status) {
            dispatch({
                type: "UPDATE_FILE",
                response: {
                    fileSize: data.data.fileSize,
                    fileName: data.data.fileName,
                    fileData: fileBuffer,
                    fileId: obj.fileId,
                    folderName: obj.folderName,
                }
            })
            dispatch({
                type: "SHOW_ALERT",
                response: {
                    type: "SUCCESS",
                    message: data.data.message
                }
            })
        } else {
            dispatch({
                type: "SHOW_ALERT",
                response: {
                    type: "DANGER",
                    message: data.data.message
                }
            })
        }
    }).catch((error) => {
        console.log(error)
    })
}

export const deleteFile = (ep, method, data) => async (dispatch) => {
    const username = data.userName
    commonAxios(ep, method, data).then((data) => {
        if (data.data.status) {
            dispatch(getFolderData('get-files&folder', 'POST', { userName: username }))
            dispatch({
                type: "SHOW_ALERT",
                response: {
                    type: "SUCCESS",
                    message: data.data.message
                }
            })
        } else {
            dispatch({
                type: "SHOW_ALERT",
                response: {
                    type: "DANGER",
                    message: data.data.message
                }
            })
        }
    }).catch((error) => {
        console.log(error)
    })
}

export const createFolder = (ep, method, data, changeFolderName, setFolderName) => async (dispatch) => {
    const username = data.userName
    commonAxios(ep, method, data).then((data) => {
        if (data.data.status) {
            changeFolderName()
            setFolderName('')
            dispatch(getFolderData('get-files&folder', 'POST', { userName: username }))
            dispatch({
                type: "SHOW_ALERT",
                response: {
                    type: "SUCCESS",
                    message: data.data.message
                }
            })
        } else {
            dispatch({
                type: "SHOW_ALERT",
                response: {
                    type: "DANGER",
                    message: data.data.message
                }
            })
        }
    }).catch((error) => {
        console.log(error)
    })
}


export const deleteFolder = (ep, method, data) => async (dispatch) => {
    const username = data.userName
    commonAxios(ep, method, data).then((data) => {
        if (data.data.status) {
            dispatch(getFolderData('get-files&folder', 'POST', { userName: username }))
            dispatch({
                type: "SHOW_ALERT",
                response: {
                    type: "SUCCESS",
                    message: data.data.message
                }
            })
        } else {
            dispatch({
                type: "SHOW_ALERT",
                response: {
                    type: "DANGER",
                    message: data.data.message
                }
            })
        }
    }).catch((error) => {
        console.log(error)
    })
}
export const emptyFileFolderData = () => (dispatch) => {
    dispatch({
        type: "EMPTY_FILE_FOLDER"
    })
}
