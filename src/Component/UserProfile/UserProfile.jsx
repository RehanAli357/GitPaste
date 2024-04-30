import React from 'react'
import { useNavigate } from 'react-router-dom'
import { UseSelector, useSelector } from 'react-redux';
const UserProfile = () => {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    return (
        <>
            <section className='User-Profile'>
                <p>Welocome User...</p>
                <p onClick={() => { navigate("/profile") }}>{user.name.length > 0 ? user.name.toUpperCase().slice(0, 2) : "N/A"}</p>
            </section>
        </>
    )
}

export default UserProfile