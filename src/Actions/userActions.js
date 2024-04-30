import commonAxios from "../CommonAxios/commonAxios";

export const signupUser = (EP, type, Data) => async (dispatch) => {
    commonAxios(EP, type, Data).then((data) => {
        if (data.data.status) {
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
    });
};

export const loginUser = (EP, type, Data, setIsLogin) => async (dispatch) => {
    try {
        const data = await commonAxios(EP, type, Data);
        if (data.data.status) {
            const userData = {
                name: Data.name,
                token: data.data.token
            }
            dispatch({
                type: "SHOW_ALERT",
                response: {
                    type: "SUCCESS",
                    message: data.data.message
                }
            })
            localStorage.setItem("userData", JSON.stringify(userData));
            setIsLogin(false);

            await dispatch(getUser('get-user', 'POST', { name: Data.name }));
        } else {
            dispatch({
                type: "SHOW_ALERT",
                response: {
                    type: "DANGER",
                    message: data.data.message
                }
            })
        }
    } catch (error) {
        console.log(error);
    }
}

export const getUser = (EP, type, Data) => async (dispatch) => {
    commonAxios(EP, type, Data).then((data) => {
        if (data.data.status) {
            dispatch({
                type: "GET_USER_DATA",
                data: data.data.user
            })
            localStorage.setItem("userData", JSON.stringify(data.data.user));
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
    });
}

export const logoutUser = (EP, type, Data, setIsLogin, navigate) => async (dispatch) => {
    commonAxios(EP, type, Data).then((data) => {
        if (data.data.status) {
            dispatch({
                type: "LOGOUT_USER",
                data: {}
            })
            dispatch({
                type: "SHOW_ALERT",
                response: {
                    type: "SUCCESS",
                    message: data.data.message
                }
            })
            localStorage.removeItem("userData");
            setIsLogin(true)
            navigate("/")
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

export const updateUser = (EP, type, Data, setEdit, edit, setFormData, formData) => async (dispatch) => {
    commonAxios(EP, type, Data).then((data) => {
        if (data.data.status) {
            dispatch({
                type: "UPDATE_USER",
                data: Data
            })
            dispatch({
                type: "SHOW_ALERT",
                response: {
                    type: "SUCCESS",
                    message: data.data.message
                }
            })
            dispatch(getUser('get-user', 'POST', { name: Data.updatedName })).then(() => {
                setEdit(!edit)
                setFormData({
                    ...formData,
                    currPassword: '',
                    newPassword: ''
                })
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
    }).catch((error) => console.log(error))
}