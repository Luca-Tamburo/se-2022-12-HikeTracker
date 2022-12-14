/*
 * --------------------------------------------------------------------
 *
 * Package:         client
 * Module:          ui-core/RegisterForm
 * File:            RegisterFormAdvanced.jsx
 *
 * Copyright (c) 2022 - se2022-Team12
 * All rights reserved.
 * --------------------------------------------------------------------
 */

// Imports
import { Button, Row, Col, Spinner } from "react-bootstrap";
import { Formik, Form } from "formik";

// Components
import * as CustomField from "../../utils/Input/index";

// Validation
import RegisterAdvancedSchema from "../../../validation/RegisterAdvancedSchema";

// Constants
import registerAdvancedForm from '../../../constants/registerAdvancedForm'


const RegisterFormAdvanced = (props) => {

    const loading = props.loading;

    return (
        <Formik
            initialValues={{
                username: "",
                email: "",
                password: "",
                passwordConfirmation: "",
                name: "",
                surname: "",
                phoneNumber: "",
                gender: "none",
            }}
            validationSchema={RegisterAdvancedSchema}
            onSubmit={(values) => props.handleSubmit(values)}
        >
            {({ touched, isValid }) => {
                const disableSubmit =
                    (!touched.username && !touched.password && !touched.email && !touched.passwordConfirmation && !touched.name && !touched.surname && !touched.phoneNumber && !touched.gender) || !isValid;
                return (
                    <Form>
                        <Row>
                            {registerAdvancedForm.map((input, index) => {
                                return (
                                    <Col xs={6} key={input.id}>
                                        <CustomField.Input
                                            className='mt-3'
                                            id={input.id}
                                            name={input.name}
                                            type={input.type}
                                            placeholder={input.placeholder}
                                            label={input.label}
                                        />
                                    </Col>
                                );
                            })}
                            <Col xs={6}>
                                <CustomField.Select id='gender' name='gender' defaultLabel="Select your gender" defaultValue="none" label='Gender' className="mt-3" >
                                    <option value='M'>Male</option>
                                    <option value='F'>Female</option>
                                    <option value='U'>Not specified</option>
                                </CustomField.Select>
                            </Col>
                            <Button variant="primary" type="submit" className="p-3 rounded-3 mt-4 w-100 fw-semibold" disabled={disableSubmit}>
                                {loading && <Spinner animation='border' size='sm' as='span' role='status' aria-hidden='true' className='me-2' />}
                                Sign up
                            </Button>
                        </Row>
                    </Form>
                );
            }}
        </Formik >
    );
};

export default RegisterFormAdvanced
