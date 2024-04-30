import React from 'react';
import { useNavigate } from "react-router-dom";
const Header = () => {
    const nav = useNavigate();


    return (
        <>
            <header>
                <div className="container">
                    <p className="typed">YES Git Paste Made It Easy...</p>
                </div>
                <div className='Header-Data'>
                    <p>1</p>
                    <b>Create a Zip file</b>
                </div>
                <div className='Header-Data'>
                    <p>2</p>
                    <b>Upload the File</b>
                </div>
                <div className='Header-Data'>
                    <p>3</p>
                    <b>Get a link to access</b>
                </div>
                <button onClick={() => { nav("/projects") }} className='Common-Btn'> Let's Explore</button>
            </header>
        </>
    )
}

export default Header