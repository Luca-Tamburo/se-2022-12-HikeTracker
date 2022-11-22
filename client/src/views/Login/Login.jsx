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
            <h1 className='text-center fw-bold fst-italic mt-5'>Login</h1>
            <Col xs={4} md={5} className='mx-auto p-0'>
                <LoginForm handleSubmit={props.handleSubmit} />
            </Col>
            <Col xs={5} md={4} lg={{ span: 5, offset: 1 }} className='p-0'>
                <img alt='Login' src={loginImage} style={{ width: 650 }} />
            </Col>
        </>
    );
}

export default Login;