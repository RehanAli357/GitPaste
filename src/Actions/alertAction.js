export const showAlert = (type,message)=>{
    return({
        type:"SHOW_ALERT",
        response:{
            type:type,
            message:message
        }
    })
}

export const hideAlert = ()=>{
    return({
        type:"HIDE_ALERT",
    })
}