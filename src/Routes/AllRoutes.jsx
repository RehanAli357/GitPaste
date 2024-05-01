import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../Component/Pages/HomePage'
import Projects from '../Component/Pages/Projects'
import Files from '../Component/Pages/Files'
import EasyAccess from '../Component/Pages/EasyAccess'
import CreateFolder from '../Component/Pages/CreateFolder'
import Profile from '../Component/Pages/Profile'
import PrivateRoute from './PrivateRoutes'
const AllRoutes = () => {
    return (
        <Routes>
            <Route exact path='/GitPaste' element={<HomePage />} />
            <Route path='/projects' element={<PrivateRoute><Projects /></PrivateRoute>} />
            <Route path='/folder/:id' element={<PrivateRoute><Files /></PrivateRoute>} />
            <Route path='/easy-access/:username/:folder/:key/:id/:time' element={<EasyAccess />} />
            <Route path='/create-folder' element={<PrivateRoute><CreateFolder /></PrivateRoute>} />
            <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route exact path='*' element={<HomePage />} />
        </Routes>
    )
}

export default AllRoutes