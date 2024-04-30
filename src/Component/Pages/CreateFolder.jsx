import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertBox from "../AlertBox/AlertBox"
const CreateFolder = () => {
    const [formData, setFormData] = useState({
        folderName: '',
        file: ''
    })
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const homeNavigate = () => {
        navigate("/")
    }
    return (
        <>
            <div className='Create-Folder'>
                <img src={require("../../Assets/Images/home.png")} alt="home" onClick={homeNavigate} />
                <h1>Create Folder</h1>
                <div className='Folder-Form'>
                    <form onSubmit={handleSubmit}>
                        <input onChange={handleChange} name="folderName" type="text" placeholder='Enter the Folder Name' />
                        <div className='Form-Upload'>
                            <img src={require("../../Assets/Images/fileupload.png")} alt="upload" /><input type="file" />
                        </div>
                        <button className='Common-Btn'>Submit</button>
                    </form>
                </div>
            </div>
            <AlertBox />
        </>
    )
}

export default CreateFolder