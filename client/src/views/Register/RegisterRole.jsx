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
import { useContext, useEffect, useState } from "react";
import { Row, Col, Dropdown, Table, Button } from "react-bootstrap";
import { useNavigate, Link, useLocation } from "react-router-dom";

// Components
import { RegisterFormHiker, RegisterFormAdvanced } from "../../components/ui-core/RegisterForm/RegisterForm";

// Contexts
import { AuthContext } from "../../contexts/AuthContext";

const RegisterRole = () => {
    const [session] = useContext(AuthContext);
    const navigate = useNavigate(); // Navigation handler
    const location=useLocation();
    const role=location.state.Role;

    useEffect(() => {
        if (session.loggedIn)
            navigate('/', { replace: true });
    }, []);
    
    return(
    <Row className="p-4 my-4 flex-fill align-items-center">
        <div className='mb-5 d-flex flex-column justify-content-center align-items-center' style={{ zIndex: 99 }}>
            <h1 className='text-center fw-bold fst-italic mt-4 mb-4'>Sign up</h1>
        </div>
        <Col xs={{ span: 12 }} lg={{ span: 6 }} className="mx-auto">
            { role=== 'Hiker' ? <RegisterFormHiker Role={role}/> : <RegisterFormAdvanced Role={role}/>}
        </Col>
    </Row>);
}

export default RegisterRole