import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const auth = useSelector(state => state.user)
    if (!auth.token.length>0) {
        return <Navigate to="/" />
    }
    return children;
}

export default PrivateRoute