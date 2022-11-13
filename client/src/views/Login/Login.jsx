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
import { Row, Col, Form, Container, Button } from 'react-bootstrap';


//Components
import LoginForm from '../../components/ui-core/LoginForm/LoginForm';
import loginImage from '../../assets/loginImage.png'

const Login = (props) => {


    return (
        <Row >
            <div className='mb-5 d-flex flex-column justify-content-center align-items-center' style={{ zIndex: 99 }}>
                <h1 className='text-center fw-bold fst-italic mt-4 mb-4'>Login</h1>
            </div>
            <Col className='ms-5 me-5'>
                <LoginForm handleSubmit={props.handleSubmit} />
            </Col>
            <Col>
                <img
                    alt='Home'
                    src={loginImage}
                    className="top-0 start-0 p-0 w-100 h-100"
                    style={{ objectFit: 'cover', objectPosition: "center center" }}
                />
            </Col>
        </Row >
    );
}

export default Login;