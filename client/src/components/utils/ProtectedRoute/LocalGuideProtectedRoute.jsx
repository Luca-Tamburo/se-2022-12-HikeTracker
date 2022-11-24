//Imports
import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

//Contexts
import { AuthContext } from '../../../contexts/AuthContext'

const LocalGuideProtectedRoute = () => {
    const { userInfo, isloggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo.role !== "localGuide")
            navigate('/', { replace: true });
    }, [isloggedIn]); //eslint-disable-line react-hooks/exhaustive-deps

    if (isloggedIn)
        return <Outlet />
}

export default LocalGuideProtectedRoute;