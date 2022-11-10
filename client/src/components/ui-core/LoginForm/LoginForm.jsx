/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/components/ui-core/HikeCard
* File:            HikeCard.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

//Imports
import { useState, useContext } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

//Components
import Input from "./Input"

const LoginForm = () => {
    /* const [loading, setLoading] = useState(false);
    const [, , setDirty] = useContext(AuthContext);
    const notify = useNotification(); // Notification handler
    const navigate = useNavigate(); // Navigation handler

    // Perform authentication and login
    const handleSubmit = (credentials) => {
        setLoading(true);
        api.login(credentials)
            .then(user => {
                setDirty(true);
                notify.success(`Benvenuto ${user.name}!`)
                navigate('/', { replace: true });
            })
            .catch(err => notify.error(err))
            .finally(() => setLoading(false));
    }
 */
    const LoginSchema = Yup.object().shape({
        username: Yup.string().email('Email not valid').required('Email Required'),
        password: Yup.string().required('Password Required')
    });

        {/* <div className="Auth-form-container">
                    <Form className="Auth-form">
                        <div className="Auth-form-content">
                            <div className="form-group mt-3 me-5">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control mt-1 border border-4 rounded-pill"
                                    placeholder="Enter email"
                                    required={true} 
                                />
                            </div>
                            <div className="form-group mt-3 me-5">
                                <label cls>Password</label>
                                <input
                                    type="password"
                                    className="form-control mt-1 br-4 border border-4 rounded-pill"
                                    placeholder="Enter password"
                                    required={true} 
                                    minLength={6}
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
                    </Form>
                </div> */}
                return(<Formik validateOnMount initialValues={{ username: '', password: '' }} validationSchema={LoginSchema} /* onSubmit={} */>
                {/* {({ touched, isValid }) => {
                    const disableSubmit = (!touched.username && !touched.password) || !isValid || loading; */}
                    {/* return ( */}
                        <Form>
                            <Input className="mt-3" id="login-email" name="username" type="email" placeholder="Inserisci il tuo indirizzo email" label="Email" />
                            <Input className="mt-3" id="login-password" name="password" type="password" placeholder="Inserisci la tua password" label="Password" />
                            <Button variant="primary" type="submit" className=' p-3 rounded-3 mt-4  fw-semibold border ' /* disabled={disableSubmit} */>
                                {/* {loading &&  */}{/* <Spinner animation='grow' size='sm' as='span' role='status' aria-hidden='true' className='me-2' /> */}{/* } */}
                                Login
                            </Button>
                        </Form>
                   {/*  ); */}
                
            </Formik>);

}

export default LoginForm;