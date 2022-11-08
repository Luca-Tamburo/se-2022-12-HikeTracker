/*
* --------------------------------------------------------------------
*
* Package:         client
* Module:          views
* File:            Register.js
*
* Description:     Registration page
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

/*
// Imports
import { useContext, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// Components
import RegisterForm from "../components/ui-core/RegisterForm";

// Contexts
import { AuthContext } from "../contexts/AuthContext";

const Register = () => {
    const [session] = useContext(AuthContext);
    const navigate = useNavigate(); // Navigation handler

    useEffect(() => {
        if (session.loggedIn)
            navigate('/', { replace: true });
    }, []); 

    if (!session.loggedIn)
        return (
            <Row className="p-4 my-4 flex-fill align-items-center">
                <div className="text-center">
                    <h1 className="fw-extrabold text-primary text-center">Welcome to Politecnico di Torino</h1>
                    <h4 className="text-dark">Accedi per visualizzare il tuo piano di studio!</h4>
                </div>
                <Col xs={{ span: 12 }} lg={{ span: 6 }} className="mx-auto">
                    <RegisterForm />
                </Col>
            </Row>
        );
}

export default Register;*/