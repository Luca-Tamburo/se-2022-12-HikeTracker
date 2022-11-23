//Imports
import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

//Contexts
import { AuthContext } from '../../../contexts/AuthContext'

const ProtectedRoute = () => {
    const { isloggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isloggedIn)
            navigate('/', { replace: true });
    }, [isloggedIn]); //eslint-disable-line react-hooks/exhaustive-deps

    if (isloggedIn)
        return <Outlet />
}

export default ProtectedRoute;