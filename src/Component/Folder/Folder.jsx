import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { deleteFolder } from '../../Actions/file&FolderActions';
const Folder = ({ data }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const deleteFolderData = async (name) => {
        dispatch(deleteFolder('delete-folder', 'DELETE', { userName: user.name, folderName: name }))
    }

    return (
        <>
            <div className='Folder'>
                <div className="folder-Delete">
                    <button className='Common-Btn' onClick={() => {
                        deleteFolderData(data.folderName)
                    }}>Delete Folder</button>
                </div>
                <h2>{data.folderName}</h2>
                <img onClick={() => { navigate(`/folder/${data.folderName}`) }}
                    src={require("../../Assets/Images/folder.png")} alt="folder" />
            </div>
        </>
    )
}

export default Folder