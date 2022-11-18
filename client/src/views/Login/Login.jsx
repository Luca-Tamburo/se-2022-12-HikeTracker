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
import loginImage from '../../assets/loginImage.png'

const Login = (props) => {
    return (
        <>
            <h1 className='text-center fw-bold fst-italic mt-5'>Login</h1>
            <Col xs={4} md={6} lg={6} className='mx-5 p-0'>
                <LoginForm handleSubmit={props.handleSubmit} />
            </Col>
            <Col xs={5} md={4} lg={5} className='p-0'>
                <img alt='Home' src={loginImage} className="top-0 start-0 p-0 w-100 h-100" style={{ objectFit: 'cover', objectPosition: "center center" }} />
            </Col>
        </>
    );
}

export default Login;