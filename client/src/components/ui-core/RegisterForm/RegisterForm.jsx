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

// Imports
import { useState } from "react";
import { Button, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";


// Components
import Input from "../../utils/Input/Input";

// Validation
import RegisterSchema from "../../../validation/RegisterSchema";
import RegisterAdvancedSchema from "../../../validation/RegisterAdvancedSchema";

// Constants
import registerForm from '../../../constants/registerForm'

// Hooks
import useNotification from "../../../hooks/useNotification";

const RegisterFormHiker = (props) => {
  const loading=props.loading;

  return (
    <Formik
        initialValues={{
        username: "",
        email: "",
        password: "",
        passwordConfirmation: "",
      }}
      validationSchema={RegisterSchema}
      onSubmit={(values) => props.handleSubmit(values)}
    >
      {({ touched, isValid }) => {
        const disableSubmit =
          (!touched.username &&
            !touched.password &&
            !touched.email &&
            !touched.passwordConfirmation) ||
          !isValid;
        return (
          <Form>
            {registerForm.map((input, index) => {
              return (
                <Input
                key={index}
                id={input.id}
                name={input.name}
                type={input.type}
                placeholder={input.placeholder}
                label={input.label}
                className="mt-3"
                />
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

const RegisterFormAdvanced = (props) => {

  const loading=props.loading;

  return (
    <Formik
        initialValues={{
        username: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        name: "",
        surname: "",
      }}
      validationSchema={RegisterAdvancedSchema}
      onSubmit={(values) => props.handleSubmit(values)}
    >
      {({ touched, isValid }) => {
        const disableSubmit =
          (!touched.username &&
            !touched.password &&
            !touched.email &&
            !touched.passwordConfirmation) ||
          !isValid;
        return (
          <Form>
            {/* TODO: Capire se si può rendere più compatto */}
            <Row>
              <Col>
                <Input className="mt-3" id="signup-username" name="username" type="text" placeholder="Insert your username" label="Username"/>
              </Col>
              <Col>
                <Input className="mt-3" id="signup-email" name="email" type="email" placeholder="Insert your email" label="Email"/>
              </Col>
            </Row>
            <Row>
              <Col>
                <Input className="mt-3" id="signup-name" name="name" type="text" placeholder="Insert your name" label="First name"/>
              </Col>
              <Col>
                <Input className="mt-3" id="signup-surname" name="surname" type="text" placeholder="Insert your surname" label="Surname"/>
              </Col>
            </Row>
            <Row>
              <Col>
                <Input className="mt-3" id="signup-password" name="password" type="password" placeholder="Insert your password" label="Password"/>{" "}
              </Col>
              <Col>
                <Input className="mt-3" id="signup-number" name="phoneNumber" type="text" placeholder="Insert your phone number" label="Phone number"/>
              </Col>
            </Row>
            <Row>
              <Input className="mt-3" id="signup-confirmation-password" name="passwordConfirmation" type="password" placeholder="Confirm your password" label="Confirmation password"/>
            </Row>
            <Row>
              <Button variant="primary" type="submit" className="p-3 rounded-3 mt-4 w-100 fw-semibold" disabled={disableSubmit}>
              {loading && <Spinner animation='border' size='sm' as='span' role='status' aria-hidden='true' className='me-2' />}
                Sign up
              </Button>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export { RegisterFormHiker, RegisterFormAdvanced };
