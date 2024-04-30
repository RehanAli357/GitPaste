import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import danger from "../../Assets/Images/danger.png"
import success from "../../Assets/Images/check.png"
import close from "../../Assets/Images/close.png";
import { hideAlert } from '../../Actions/alertAction';
const AlertBox = () => {
    const dispatch = useDispatch()
    const alert = useSelector((state) => state.alert);
    const closeAlert = () => {
        dispatch(hideAlert())
    }
    useEffect(() => {
        setTimeout(() => {
            dispatch(hideAlert())
        }, 3000);
    }, [alert])
    return (
        <>
            <div style={{ display: alert?.message?.length > 0 && alert?.type?.length > 0 ? 'block' : 'none' }}>

                <div className='Alert'>
                    <div className='alertIcon'>
                        {
                            alert.type === "SUCCESS" ?
                                <img src={success} alt="success" /> :
                                <img src={danger} alt="alert" />
                        }
                    </div>
                    <div className='alertMsg'>
                        <img onClick={closeAlert} src={close} alt="close" />
                        <p>
                            {alert.message}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AlertBox