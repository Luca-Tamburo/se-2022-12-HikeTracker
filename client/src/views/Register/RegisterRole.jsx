/*
* --------------------------------------------------------------------
*
* Package:         client
* Module:          views
* File:            RegisterRole.js
*
* Description:     Registration page
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/


// Imports
import { useContext, useEffect } from "react";
import { Col } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

// Components
import { RegisterFormHiker, RegisterFormAdvanced } from "../../components/ui-core/RegisterForm/RegisterForm";

// Contexts
import { AuthContext } from "../../contexts/AuthContext";

const RegisterRole = () => {
    const { isloggedIn } = useContext(AuthContext);
    const navigate = useNavigate(); // Navigation handler
    const location = useLocation();
    const role = location.state.Role;

    useEffect(() => {
        if (isloggedIn)
            navigate('/', { replace: true });
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Col xs={10} className="d-flex flex-column ms-5 p-0 mt-5">
            <h1 className='text-center fw-bold fst-italic mt-5'>Sign up</h1>
            <Col xs={{ span: 12 }} lg={{ span: 6 }} className="mx-auto">
                {role === 'hiker' ? <RegisterFormHiker Role={role} /> : <RegisterFormAdvanced Role={role} />}
            </Col>
        </Col>
    );
}

export default RegisterRole