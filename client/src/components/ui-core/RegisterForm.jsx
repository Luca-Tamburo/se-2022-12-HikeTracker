/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          ui-core
* File:            RegisterForm.jsx
* 
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/
/*
// Imports
import { useState, useContext } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

// Services
import api from '../../services/api'
// Components
import Input from "../utils/Input"

// Contexts
//import { AuthContext } from "../contexts/AuthContext";

// Hooks
import useNotification from '../hooks/useNotification';

const RegisterForm = () => {
    const [loading, setLoading] = useState(false);
    const [, , setDirty] = useContext(AuthContext);
    const notify = useNotification(); // Notification handler
    const navigate = useNavigate(); // Navigation handler

    // Perform authentication and login
    const handleSubmit = (credentials) => {
        setLoading(true);
        api.addNewUser(credentials)
            .then(user => {
                setDirty(true);
                notify.success(`Welcome ${user.name}!`)
                navigate('/', { replace: true });
            })
            .catch(err => notify.error(err))
            .finally(() => setLoading(false));
    }

    const RegisterSchema = Yup.object().shape({
        username: Yup.string().required('Username requested'),
        email: Yup.string().email('Email is not valid').required('Email needed'),
        password: Yup.string().required('Password needed')
    });

    return (
        <Formik validateOnMount initialValues={{ username: '', email:'', password: '' }} validationSchema={RegisterSchema} onSubmit={(values) => handleSubmit(values)}>
            {({ touched, isValid }) => {
                const disableSubmit = (!touched.username && !touched.password) || !isValid || loading;
                return (
                    <Form>
                        <Input className="mt-3" id="login-username" name="username" type="text" placeholder="Insert your username" label="User" />
                        <Input className="mt-3" id="login-email" name="email" type="email" placeholder="Insert your email" label="Email" />
                        <Input className="mt-3" id="login-password" name="password" type="password" placeholder="Insert your password" label="Password" />
                        <Button variant="primary" type="submit" className='p-3 rounded-3 mt-4 w-100 fw-semibold' disabled={disableSubmit}>
                            {loading && <Spinner animation='grow' size='sm' as='span' role='status' aria-hidden='true' className='me-2' />}
                            Sign up
                        </Button>
                    </Form>
                );
            }}
        </Formik>
    );
}

export default RegisterForm; */