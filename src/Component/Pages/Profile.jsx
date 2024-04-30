import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../Actions/userActions';
import AlertBox from '../AlertBox/AlertBox';
import commonAxios from '../../CommonAxios/commonAxios';
const Profile = () => {
    const [edit, setEdit] = useState(false)
    const [showPswd, setShowPswd] = useState(false)
    const user = useSelector(state => state.user);
    const [formData, setFormData] = useState({
        updatedName: user.name,
        currPassword: '',
        newPassword: ""
    })
    const [fileData, setFileData] = useState({
        totalFolders: 0,
        spaceUsed: 0,
    })
    const dispatch = useDispatch();

    const pswdRef = useRef(null)
    const showHiddenPassword = () => {
        setShowPswd(!showPswd)
        if (pswdRef.current.type === 'password') {
            pswdRef.current.type = 'text'
        } else {
            pswdRef.current.type = 'password'
        }
    }

    const onFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const updateUserDetails = async (e) => {
        e.preventDefault();
        if (formData.updatedName.length > 3 && formData.newPassword.length > 4 && formData.currPassword.length > 4) {
            dispatch(updateUser('update-user-credential', 'PUT', { name: user.name, ...formData }, setEdit, edit, setFormData, formData))
        } else {
            console.log("Invalid Credentials")
        }
    }
    useEffect(() => {
        if (user?.name.length > 0) {
            commonAxios('get-files&folder', 'POST', { userName: user.name }).then((data) => {
                setFileData((pdata) => ({
                    ...pdata,
                    totalFolders: data.data.data.folders.length,
                }));

                let sum = 0
                data.data.data.folders.forEach(element => {
                    element.files.forEach((file) => {
                        let data = (file.fileSize / 1048576)
                        sum += +data.toFixed(2)
                    })
                });
                setFileData((pdata) => ({
                    ...pdata,
                    spaceUsed: sum,
                }));
                
            }).catch((err) => {
                console.log(err)
            })
        }
    }, [])
    return (
        <>
            <div className='Profile'>
                <div className='Profie-Card'>
                    <div className='Card-Left'>
                        <h1>{user.name.toUpperCase().slice(0, 2)}</h1>
                        {
                            !edit ?
                                <>
                                    <p>Name - {user.name}</p>
                                    <p>Password - <span>FakePaswd</span></p>
                                </> : ''
                        }

                        {
                            edit ? <form onSubmit={updateUserDetails}>
                                <input
                                    type="text"
                                    name='updatedName'
                                    onChange={onFormChange}
                                    value={formData.updatedName}
                                    placeholder='Update Name'
                                />

                                <div className='Card-Password'>

                                    <input
                                        type="password"
                                        name='currPassword'
                                        onChange={onFormChange}
                                        value={formData.currPassword}
                                        placeholder='Current password'
                                    />

                                    <input
                                        ref={pswdRef}
                                        type="password"
                                        name='newPassword'
                                        onChange={onFormChange}
                                        value={formData.newPassword}
                                        placeholder='New password'
                                    />

                                    {
                                        showPswd ?
                                            <img onClick={showHiddenPassword} src={require("../../Assets/Images/view.png")} alt="view" /> :
                                            <img onClick={showHiddenPassword} src={require("../../Assets/Images/hide.png")} alt="hide" />
                                    }

                                </div>
                                <button className='Common-Btn'>Update</button>
                            </form> : ''
                        }
                        <img src={require("../../Assets/Images/editing.png")} alt="edit" onClick={() => { setEdit(!edit) }} />
                    </div>
                    <div className='Card-Right'>
                        <p>Total Projects {fileData.totalFolders}</p>
                        <p>Total Space {user.storage}MB</p>
                        <p>Remaining Space {user.storage-fileData.spaceUsed}MB</p>
                    </div>
                </div>
            </div>
            <AlertBox />
        </>
    )
}

export default Profile