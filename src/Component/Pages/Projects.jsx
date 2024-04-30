import React, { useEffect, useState } from 'react'
import Folder from '../Folder/Folder'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { createFolder, getFolderData } from '../../Actions/file&FolderActions'
import AlertBox from '../AlertBox/AlertBox'
const Projects = () => {
    const [isChange, setChange] = useState(false)
    const [folderName, setFolderName] = useState('');
    const navigation = useNavigate();
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const allfolders = useSelector(state => state.fileFolder)
    const homeNavigate = () => {
        navigation("/")
    }

    useEffect(() => {
        if (user.name) {
            dispatch(getFolderData('get-files&folder', 'POST', { userName: user?.name }))
        }
    }, [])

    const changeFolderName = () => {
        setChange(!isChange)
    }

    const folderChange = (e) => {
        setFolderName(e.target.value)
    }
    const saveFolder = () => {
        let data = allfolders.folder.includes(folderName)
        if (data) {
        } else {
            dispatch(createFolder('create-folder', 'POST', { userName: user?.name, folderName: folderName }, changeFolderName, setFolderName))
        }
    }
    return (
        <>
            <section className='Projects'>
                <img src={require("../../Assets/Images/home.png")} alt="home" onClick={homeNavigate} />
                <h1>All Projects</h1>
                <div className='Project-Folder'>
                    {
                        allfolders.folder.length > 0 ?
                            allfolders.folder.map((data, index) => {
                                return (
                                    <>
                                        <Folder key={index} data={data} />
                                    </>
                                );
                            }) : ''
                    }
                    <div className='Folder'>
                        {
                            !isChange ?
                                <>
                                    <h2>Create Folder</h2>
                                </> : <>
                                    <input type="text" placeholder='Folder Name' value={folderName} onChange={folderChange} />
                                    <button className='Common-Btn' onClick={saveFolder}>Save</button>
                                </>
                        }
                        <img src={require("../../Assets/Images/plus.png")} alt="folder" onClick={changeFolderName} />
                    </div>
                </div>
            </section>
            <AlertBox />
        </>
    )
}

export default Projects