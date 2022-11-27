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
import { useContext } from "react";
import { Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

// Styles
import authImg from '../../assets/authenticationImg.png'

// Contexts
import { AuthContext } from "../../contexts/AuthContext";

const Register = () => {
    const { isloggedIn } = useContext(AuthContext);

    if (!isloggedIn)
        return (
            <>
                <h1 className='text-center fw-bold fst-italic mt-5'>Select your role</h1>
                <Col xs={12} sm={4} md={5} lg={{ span: 3, offset: 1 }} className='d-flex flex-column align-items-center align-items-md-start mt-sm-5 p-0'>
                    <Link to={`/signup/hiker`} state={{ Role: "hiker" }}>
                        <Button variant="primary" className='p-3 rounded-3 mt-4 fw-semibold border' style={{ width: "200px" }}>
                            Hiker
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
                <Col sm={6} md={5} lg={{ span: 6, offset: 2 }} className='d-none d-sm-block p-0 ms-lg-auto'>
                    <img alt='Authentication' src={authImg} className='' style={{ width: 700 }} />
                </Col>
            </>
        );
}

export default Register;