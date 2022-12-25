/*
* --------------------------------------------------------------------
*
* Package:         client
* Module:          views/Register
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
import RegisterForm from "../../components/ui-core/RegisterForm/RegisterForm";
import { RegisterFormAdvanced } from "../../components/ui-core";

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
      <h1 className='text-center fw-bold fst-italic mt-4'>Signup</h1>
      {role === 'hiker' ?
        <>
          <Col xs={10} sm={10} md={5} lg={5} xl={5} className='ms-4 mb-3 ms-lg-5'>
            <RegisterForm Role={role} handleSubmit={handleSubmit} loading={loading} setLoading={setLoading} />
          </Col>
          <Col md={4} lg={{ span: 5, offset: 1 }} xl={{ span: 4, offset: 2 }} className='d-none d-md-block'>
            <img alt='Registration' src={registerImg} style={{ width: 500 }} />
          </Col>
        </> :
        <>
          <Col xs={10} sm={10} md={6} lg={6} xl={5} className='ms-4 mb-3 ms-lg-5'>
            <RegisterFormAdvanced Role={role} handleSubmit={handleSubmit} loading={loading} setLoading={setLoading} />
          </Col>
          <Col md={4} lg={4} xl={{ span: 4, offset: 2 }} className='d-none d-md-block'>
            <img alt='Registration' src={registerImg} style={{ width: 500 }} />
          </Col>
        </>
      }
    </>
  );
}

export default RegisterRole