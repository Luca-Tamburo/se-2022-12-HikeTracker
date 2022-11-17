//Imports
import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

//Contexts
import { AuthContext } from '../../../contexts/AuthContext'

const ProtectedRoute = () => {
    const [session] = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!session.loggedIn)
            navigate('/', { replace: true });
    }, [session.loggedIn]); //eslint-disable-line react-hooks/exhaustive-deps

    if (session.loggedIn)
        return <Outlet />
}

export default ProtectedRoute;