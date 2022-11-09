/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/views/Hike
* File:            Hike.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

//Imports
import { Row, Col, Container, Form, Button } from 'react-bootstrap';

//Components


const Login = (props) => {
    return (
        <Row >
            <div className='mb-5 d-flex flex-column justify-content-center align-items-center' style={{ zIndex: 99 }}>
                <h1 className='text-center fw-bold fst-italic mt-4 mb-4'>Login</h1>
            </div>
            <Col className='ms-5 me-5'>
                <div className="Auth-form-container">
                    <form className="Auth-form">
                        <div className="Auth-form-content">
                            <div className="form-group mt-3 me-5">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control mt-1 border border-4 rounded-pill"
                                    placeholder="Enter email"
                                />
                            </div>
                            <div className="form-group mt-3 me-5">
                                <label cls>Password</label>
                                <input
                                    type="password"
                                    className="form-control mt-1 br-4 border border-4 rounded-pill"
                                    placeholder="Enter password"
                                />
                            </div>
                            <div className="d-flex gap-2 mt-3 rounded-pill">
                                <button type="submit" className="btn btn-primary border rounded-pill">
                                    Submit
                                </button>
                            </div>
                            <p className="forgot-password text-right mt-2">
                                Forgot <a href="#">password?</a>
                            </p>
                        </div>
                    </form>
                </div>
            </Col>
            <Col></Col>
        </Row >
    );
}

export default Login;