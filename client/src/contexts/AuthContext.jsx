/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          contexts
* File:            AuthContext.jsx
* 
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports
import { createContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';

// Services
import api from '../services/api';

// Hooks
import useNotification from '../hooks/useNotification';

const AuthContext = createContext([{}, () => { }]);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({ user: null, loggedIn: false }); // Stores user, data plan and whether the user is logged in
    const [dirty, setDirty] = useState(true); // State to reload user information

    // Load user data and data plan into client session
    useEffect(() => {
        if (dirty)
            api.getUserInfo()
                .then((user) => {
                    setUser({ user: { ...user }, loggedIn: true });
                })
                .catch(() => {
                    setUser({ user: undefined, loggedIn: false });
                    setDirty(false);
                })
    }, [dirty]);

    if (!dirty) {
        return (
            <AuthContext.Provider value={[user, setUser, setDirty]}>
                {children}
            </AuthContext.Provider>
        );
    }

    return (
        <div className='h-100 d-flex align-items-center justify-content-center'>
            <Spinner animation='border' variant='primary' className='opacity-25' />
        </div>
    );
}

export { AuthContext, AuthProvider }; 