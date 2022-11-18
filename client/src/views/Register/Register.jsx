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
import { useContext, useEffect } from "react";
import { Col, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

import authImg from '../../assets/authenticationImg.png'

// Contexts
import { AuthContext } from "../../contexts/AuthContext";

const Register = () => {
    const { isloggedIn } = useContext(AuthContext);
    const navigate = useNavigate(); // Navigation handler

    useEffect(() => {
        if (isloggedIn)
            navigate('/', { replace: true });
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    if (!isloggedIn)
        return (
            <>
                <h1 className='fw-bold fst-italic text-center my-5'>Select your role</h1>
                <Col xs={2} className='d-flex flex-column ms-5 mt-5 p-0'>
                    <Link to={`/signup/hiker`} state={{ Role: "hiker" }}>
                        <Button variant="primary" className='p-3 rounded-3 mt-4 fw-semibold border' style={{ width: "200px" }}>
                            Hike
                        </Button>
                    </Link>
                    <Link to={`/signup/localGuide`} state={{ Role: "localGuide" }}>
                        <Button variant="primary" className='p-3 rounded-3 mt-4 fw-semibold border' style={{ width: "200px" }}>
                            Local guide
                        </Button>
                    </Link>
                    <Link to={`/signup/hutWorker`} state={{ Role: "hutWorker" }}>
                        <Button variant="primary" className='p-3 rounded-3 mt-4 fw-semibold border' style={{ width: "200px" }}>
                            Hut worker
                        </Button>
                    </Link>
                </Col>
                <Col xs={{ span: 7, offset: 2 }} className='p-0 ms-auto'>
                    {/* TODO: Da fixare */}
                    <img alt='Authentication' src={authImg} className='ms-auto' style={{ width: 700 }} />
                </Col>
            </>
        );
}

export default Register;