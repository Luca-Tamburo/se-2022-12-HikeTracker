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
import { Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";

// Services
import api from "../../../services/api";

// Components
import Input from "../../utils/Input";

// Hooks
import useNotification from "../../../hooks/useNotification";

YupPassword(Yup); // extend yup

const RegisterFormHiker = (props) => {
  const notify = useNotification(); // Notification handler
  const navigate = useNavigate(); // Navigation handler

  const handleSubmit = (credentials) => {
    credentials["role"] = props.Role;
    api
      .addNewUser(credentials)
      .then((user) => {
        notify.success(` ${user.message}!`);
        navigate("/", { replace: true });
      })
      .catch((err) => {notify.error(err.error)});
  };

  const RegisterSchema = Yup.object().shape({
    username: Yup.string().required("Username requested"),
    email: Yup.string().email("Email is not valid").required("Email needed"),
    password: Yup.string().password().required("Password needed"),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  return (
    <Formik
      validateOnMount
      initialValues={{
        username: "",
        email: "",
        password: "",
        passwordConfirmation: "",
      }}
      validationSchema={RegisterSchema}
      onSubmit={(values) => handleSubmit(values)}
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
            <Input
              className="mt-3"
              id="signup-username"
              name="username"
              type="text"
              placeholder="Insert your username"
              label="Username"
            />
            <Input
              className="mt-3"
              id="signup-email"
              name="email"
              type="email"
              placeholder="Insert your email"
              label="Email"
            />
            <Input
              className="mt-3"
              id="signup-password"
              name="password"
              type="password"
              placeholder="Insert your password"
              label="Password"
            />
            <Input
              className="mt-3"
              id="signup-confirmation-password"
              name="passwordConfirmation"
              type="password"
              placeholder="Confirm your password"
              label="Confirmation password"
            />
            <Button
              variant="primary"
              type="submit"
              className="p-3 rounded-3 mt-4 w-100 fw-semibold"
              disabled={disableSubmit}
            >
              Sign up
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

const RegisterFormAdvanced = (props) => {
  const notify = useNotification(); // Notification handler
  const navigate = useNavigate(); // Navigation handler

  const handleSubmit = (credentials) => {
    credentials["role"] = props.Role;
    api
      .addNewUser(credentials)
      .then((user) => {
        notify.success(` ${user.message}!`);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        notify.error(err.error);
      });
  };

  const RegisterSchema = Yup.object().shape({
    username: Yup.string().required("Username requested"),
    email: Yup.string().email("Email is not valid").required("Email needed"),
    name: Yup.string().required("Name needed"),
    surname: Yup.string().required("Name needed"),
    password: Yup.string().password().required("Password needed"),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
    phoneNumber: Yup.number().required("Phone number needed"),
  });

  return (
    <Formik
      validateOnMount
      initialValues={{
        username: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        role: "",
        name: "",
        surname: "",
      }}
      validationSchema={RegisterSchema}
      onSubmit={(values) => handleSubmit(values)}
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
                <Input
                  className="mt-3"
                  id="signup-username"
                  name="username"
                  type="text"
                  placeholder="Insert your username"
                  label="Username"
                />
              </Col>
              <Col>
                <Input
                  className="mt-3"
                  id="signup-email"
                  name="email"
                  type="email"
                  placeholder="Insert your email"
                  label="Email"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Input
                  className="mt-3"
                  id="signup-name"
                  name="name"
                  type="text"
                  placeholder="Insert your name"
                  label="Name"
                />
              </Col>
              <Col>
                <Input
                  className="mt-3"
                  id="signup-surname"
                  name="surname"
                  type="text"
                  placeholder="Insert your surname"
                  label="Surname"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Input
                  className="mt-3"
                  id="signup-password"
                  name="password"
                  type="password"
                  placeholder="Insert your password"
                  label="Password"
                />{" "}
              </Col>
              <Col>
                <Input
                  className="mt-3"
                  id="signup-number"
                  name="phoneNumber"
                  type="text"
                  placeholder="Insert your phone number"
                  label="Phone number"
                />
              </Col>
            </Row>
            <Row>
              <Input
                className="mt-3"
                id="signup-confirmation-password"
                name="passwordConfirmation"
                type="password"
                placeholder="Confirm your password"
                label="Confirmation password"
              />
            </Row>
            <Row>
              <Button
                variant="primary"
                type="submit"
                className="p-3 rounded-3 mt-4 w-100 fw-semibold"
                disabled={disableSubmit}
              >
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
