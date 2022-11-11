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
//*
// Imports
import { useState, useContext } from 'react';
import { Button, Spinner, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { Field, Formik, Form} from 'formik';
import * as Yup from 'yup';

// Services
import api from '../../../services/api'
// Components
import Input from "../../utils/Input"

// Contexts
import { AuthContext } from "../../../contexts/AuthContext";

// Hooks
import useNotification from '../../../hooks/useNotification';

const RegisterForm = (props) => {
    const [loading, setLoading] = useState(false);
    const [, , setDirty] = useContext(AuthContext);
    const notify = useNotification(); // Notification handler
    const navigate = useNavigate(); // Navigation handler
    

    
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
        password: Yup.string().required('Password needed'),
        name:  Yup.string().when(props.currRole, (currRole)=> { return currRole !== 'Hiker' ?
                                ".required('Name needed')":''}),
        number: Yup.string().when(props.currRole, (currRole)=> { return currRole !== 'Hiker' ?
                               ".required('Phone number needed')":''}),
        surname: Yup.string().when(props.currRole, (currRole)=> { return currRole !== 'Hiker' ?
                                 '.required("Name needed")':''})
    });

    return (
        <Formik validateOnMount initialValues={{ username: '', email:'', password: '', role:'', name:'', surname:''  }} validationSchema={RegisterSchema} onSubmit={(values) => handleSubmit(values)}>
            {({ touched, isValid }) => {
                const disableSubmit = (!touched.username && !touched.password && !touched.email) || !isValid || loading;
                return (
                    <Form>
                        <Row>
                            <Col>
                        <Input className="mt-3" id="signup-username" name="username" type="text" placeholder="Insert your username" label="Username" />
                        </Col>
                        <Col>
                    
                        <Field className="mt-3" name="role" as="select"  placeholder="Insert your role" label="Role">
                           
                            <option value="Hiker" onClick={props.setCurrRole('Hiker')}>Hiker</option>
                            <option value="Local guide" onClick={props.setCurrRole('Local guide')}>Local guide</option>
                            <option value="Hut worker" onClick={props.setCurrRole('Hut worker')}>Hut worker</option>
                        </Field></Col>
                        </Row>
                        <Row><Col> 
                        <Input className="mt-3" id="signup-email" name="email" type="email" placeholder="Insert your email" label="Email" />
                        </Col><Col>
                        <Input className="mt-3" id="signup-password" name="password" type="password" placeholder="Insert your password" label="Password" />
                        </Col>
                        </Row>
                        {props.currRole !== 'Hiker' ? <><Row>
                        <Col> 
                        <Input className="mt-3" id="signup-name" name="name" type="text" placeholder="Insert your name" label="Name" />
                        </Col><Col>
                        <Input className="mt-3" id="signup-surname" name="surname" type="text" placeholder="Insert your surname" label="Surname" />
                        </Col>
                        </Row>
                        <Row>
                        <Input className="mt-3" id="signup-number" name="number" type="text" placeholder="Insert your phone number" label="Phone number" />
                        </Row></>:''}
                        <Row>
                        <Button variant="primary" type="submit" className='p-3 rounded-3 mt-4 w-100 fw-semibold' disabled={disableSubmit}>
                            {loading && <Spinner animation='grow' size='sm' as='span' role='status' aria-hidden='true' className='me-2' />}
                            Sign up
                        </Button>
                        </Row>
                    </Form>
                );
            }}
        </Formik>
    );
}

export default RegisterForm; 
//*/