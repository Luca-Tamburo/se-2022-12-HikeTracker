/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          components/utils/ProtectedRoute
* File:            HikerProtectedRoute.jsx
* 
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

//Imports
import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

//Contexts
import { AuthContext } from '../../../contexts/AuthContext'

const HikerProtectedRoute = () => {
    const { userInfo, isloggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo.role !== "hiker")
            navigate('/', { replace: true });
    }, [isloggedIn]); //eslint-disable-line react-hooks/exhaustive-deps

    if (isloggedIn)
        return <Outlet />
}

export default HikerProtectedRoute;