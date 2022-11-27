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
import { Col } from 'react-bootstrap';

//Components
import LoginForm from '../../components/ui-core/LoginForm/LoginForm';

// Styles
import loginImage from '../../assets/loginImage.png'

const Login = (props) => {
    return (
        <>
            <h1 className='text-center fw-bold fst-italic mt-5 mb-0'>Login</h1>
            <Col xs={9} sm={4} md={5} lg={5} className='mx-auto mx-sm-0 ms-sm-3'>
                <LoginForm handleSubmit={props.handleSubmit} />
            </Col>
            <Col sm={4} md={4} lg={{ span: 5, offset: 1 }} className='d-none d-sm-block'>
                <img alt='Login' src={loginImage} style={{ width: 600 }} />
            </Col>
        </>
    );
}

export default Login;