/*
 * --------------------------------------------------------------------
 *
 * Package:         client
 * Module:          ui-core/RegisterForm
 * File:            RegisterForm.jsx
 *
 * Copyright (c) 2022 - se2022-Team12
 * All rights reserved.
 * --------------------------------------------------------------------
 */

// Imports
import { Button, Col, Spinner } from "react-bootstrap";
import { Formik, Form } from "formik";

// Components
import * as CustomField from "../../utils/Input/index";

// Validation
import RegisterSchema from "../../../validation/RegisterSchema";

// Constants
import registerForm from '../../../constants/registerForm'

const RegisterForm = (props) => {
  const loading = props.loading;

  return (
    <Formik
      initialValues={{ username: "", email: "", password: "", passwordConfirmation: "" }}
      validationSchema={RegisterSchema}
      onSubmit={(values) => props.handleSubmit(values)}
    >
      {({ touched, isValid }) => {
        const disableSubmit =
          (!touched.username && !touched.password && !touched.email && !touched.passwordConfirmation) || !isValid;
        return (
          <Form>
            {registerForm.map((input, index) => {
              return (
                <Col xs={12} key={input.id}>
                  <CustomField.Input
                    id={input.id}
                    name={input.name}
                    type={input.type}
                    placeholder={input.placeholder}
                    label={input.label}
                    className="mt-3"
                  />
                </Col>
              )
            })}
            <Button variant="primary" type="submit" className="p-3 rounded-3 mt-4 w-100 fw-semibold" disabled={disableSubmit}>
              {loading && <Spinner animation='border' size='sm' as='span' role='status' aria-hidden='true' className='me-2' />}
              Sign up
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default RegisterForm;
