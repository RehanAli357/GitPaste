import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginCard from '../LoginCard/LoginCard'
import { logoutUser } from '../../Actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { emptyFileFolderData } from '../../Actions/file&FolderActions'
const Navigationbar = () => {
    const [isopen, setISOpen] = useState({
        menu: true,
        card: false,
        isLogin: 'Signup'
    })
    const [isLogin, setIsLogin] = useState(true)

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    const MenuToggle = () => {
        setISOpen((prevData) => ({ ...prevData, menu: !prevData.menu }))
    }

    const LoginToggle = (type) => {
        if (type === 'Signup') {
            setISOpen((prevData) => ({ ...prevData, isLogin: 'Signup', card: true, menu: !prevData.menu }))
        } else {
            setISOpen((prevData) => ({ ...prevData, isLogin: 'Login', card: true, menu: !prevData.menu }))
        }
    }

    const logout = () => {
        dispatch(logoutUser('logout', 'POST', { name: user.name }, setIsLogin, navigate))
        dispatch(emptyFileFolderData())

    }
    return (
        <>
            <nav>
                <div className='Logo'>
                    <h1 onClick={() => { navigate("/") }}>GP</h1>
                </div>
                <div className='Nav-Btn'>
                    {
                        isLogin ?
                            <>
                                <button
                                    onClick={() => { LoginToggle("Login") }}
                                    className='Common-Btn'>Login</button>
                                <button
                                    onClick={() => { LoginToggle("Signup") }}
                                    className='Common-Btn'>SignUp</button>
                            </>
                            : <button className='Common-Btn' onClick={logout}>Logout</button>
                    }

                </div>
                <div className='Nav-Mob'>
                    {
                        isopen.menu ?
                            <img onClick={() => { MenuToggle() }}
                                src={require("../../Assets/Images/bars.png")} alt="menu" /> :
                            <>
                                <img onClick={() => { MenuToggle() }}
                                    src={require("../../Assets/Images/close.png")} alt="close menu" />
                                <div className='Nav-Mob-Btn'>
                                    <button
                                        onClick={() => { LoginToggle("Login") }}
                                        className='Common-Btn'>Login</button>
                                    <button
                                        onClick={() => { LoginToggle("Signup") }}
                                        className='Common-Btn'>SignUp</button>
                                </div>
                            </>
                    }
                </div>
            </nav>
            {
                isopen.card ? <LoginCard
                    isOpen={isopen}
                    setISOpen={setISOpen}
                    setIsLogin={setIsLogin}
                /> : ''
            }
        </>
    )
}

export default Navigationbar