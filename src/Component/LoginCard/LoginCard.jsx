import React, { useState, useEffect } from 'react';
import { signupUser, loginUser } from '../../Actions/userActions';
import { useDispatch } from 'react-redux';
const LoginCard = ({ isOpen, setISOpen, setIsLogin }) => {
    const [formData, setFormData] = useState({
        name: '',
        password: '',
    });
    const dispatch = useDispatch()
    const chnageHandler = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const login = () => {
        dispatch(loginUser('login', 'POST', formData, setIsLogin))
    }

    const signup = () => {
        dispatch(signupUser('signup', 'POST', formData))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isOpen.isLogin === "Login") {
            login()
        } else {
            signup()
        }
        setISOpen((prevData) => ({
            ...prevData,
            card: !prevData.card,
            menu: !prevData.menu,
        }));
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (isOpen.card && !document.getElementById('login-card').contains(e.target)) {
                setISOpen((prevData) => ({ ...prevData, card: false }));
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, setISOpen]);

    return (
        <>
            <div id="login-card" className="Login-Card">
                <h1>{isOpen.isLogin} Your Credentials...!</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="username" onChange={chnageHandler} />
                    <input type="password" name="password" placeholder="password" onChange={chnageHandler} />
                    <button type="submit" className="Common-Btn">
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
};

export default LoginCard;