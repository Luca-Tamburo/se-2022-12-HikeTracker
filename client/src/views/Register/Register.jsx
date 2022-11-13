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


// Imports
import { useContext, useEffect, useState } from "react";
import { Row, Col, Dropdown, Table, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

// Components
import { RegisterFormHiker, RegisterFormAdvanced } from "../../components/ui-core/RegisterForm/RegisterForm";

// Contexts
import { AuthContext } from "../../contexts/AuthContext";

const Register = () => {
    const [session] = useContext(AuthContext);
    const navigate = useNavigate(); // Navigation handler

    useEffect(() => {
        if (session.loggedIn)
            navigate('/', { replace: true });
    }, []); //eslint-disable-line react-hooks/exhaustive-deps


    if (!session.loggedIn)
        return (
            <Col className='mb-5 d-flex flex-column justify-content-center align-items-center'><Row>
                <h2 className='text-center fw-bold fst-italic mb-4'>Select your role:</h2>
            </Row>
                <div className="d-flex">
                    <Link to={`/signup/hiker`} state={{ Role: "Hiker" }}>
                        <Button variant="primary" className='p-3 rounded-3 mt-4 fw-semibold border' style={{ width: "200px" }}>
                            Hiker
                        </Button>
                    </Link>
                    <Link to={`/signup/localGuide`} state={{ Role: "Local guide" }}>
                        <Button variant="primary" className='p-3 rounded-3 mt-4 mx-5 fw-semibold border' style={{ width: "200px" }}>
                            Local guide
                        </Button>
                    </Link>
                    <Link to={`/signup/hutWorker`} state={{ Role: "Hut worker" }}>
                        <Button variant="primary" className='p-3 rounded-3 mt-4 fw-semibold border' style={{ width: "200px" }}>
                            Hut worker
                        </Button>
                    </Link>
                </div>
            </Col>
        );
}



export default Register;