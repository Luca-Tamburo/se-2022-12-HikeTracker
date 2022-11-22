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

// Styles
import registerImg from '../../assets/registerImg.png';

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
        <>
            <h1 className='text-center fw-bold fst-italic mt-5'>Signup</h1>
            <Col xs={3} md={5} className='mx-auto p-0'>
                {role === 'hiker' ? <RegisterFormHiker Role={role} /> : <RegisterFormAdvanced Role={role} />}
            </Col>
            <Col xs={5} md={4} lg={{ span: 5, offset: 1 }} className='p-0'>
                <img alt='Registration' src={registerImg} style={{ width: 550 }} />
            </Col>
        </>
    );
}

export default RegisterRole