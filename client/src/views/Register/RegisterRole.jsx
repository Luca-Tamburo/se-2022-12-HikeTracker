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
import { Col } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

// Components
import { RegisterFormHiker, RegisterFormAdvanced } from "../../components/ui-core/RegisterForm/RegisterForm";

// Styles
import registerImg from '../../assets/registerImg.png';

// Hooks
import useNotification from "../../hooks/useNotification";

// Services
import api from "../../services/api";

// Contexts
import { AuthContext } from "../../contexts/AuthContext";

const RegisterRole = () => {
    const { isloggedIn } = useContext(AuthContext);
    const navigate = useNavigate(); // Navigation handler
    const location = useLocation();
    const role = location.state.Role;
    const [loading, setLoading] = useState(false);
    const notify = useNotification(); // Notification handler
  

    useEffect(() => {
        if (isloggedIn)
            navigate('/', { replace: true });
    }, []); //eslint-disable-line react-hooks/exhaustive-deps


    
  const handleSubmit = (credentials) => {
    setLoading(true);
    credentials["role"] = role;
    api.addNewUser(credentials)
      .then((user) => {
        notify.success(` ${user.message}!`);
        navigate("/", { replace: true });
      })
      .catch((err) => { notify.error(err.error) })
      .finally(() => setLoading(false));
  };

    return (
        <>
            <h1 className='text-center fw-bold fst-italic mt-5'>Signup</h1>
            <Col xs={3} md={5} className='mx-auto p-0'>
                {role === 'hiker' ? <RegisterFormHiker Role={role} handleSubmit={handleSubmit} loading={loading} setLoading={setLoading}/> :
                 <RegisterFormAdvanced Role={role} handleSubmit={handleSubmit} loading={loading} setLoading={setLoading}/>}
            </Col>
            <Col xs={5} md={4} lg={{ span: 5, offset: 1 }} className='p-0'>
                <img alt='Registration' src={registerImg} style={{ width: 550 }} />
            </Col>
        </>
    );
}

export default RegisterRole