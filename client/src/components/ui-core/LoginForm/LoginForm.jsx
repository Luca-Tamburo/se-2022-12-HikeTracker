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
import { useState, useContext } from "react";
import { Button, Spinner, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";

// Services
import api from "../../../services/api";

//Components
import Input from "./Input";

// Contexts
import { AuthContext } from "../../../contexts/AuthContext";

// Hooks
import useNotification from "../../../hooks/useNotification";

const LoginForm = () => {
  const notify = useNotification(); // Notification handler
  const navigate = useNavigate(); // Navigation handler

  // Perform authentication and login
  const handleSubmit = (credentials) => {
    api
      .login(credentials)
      .then((user) => {


        notify.success(`Welcome ${user.username}!`);
        navigate("/", { replace: true });
      })
      .catch((err) => notify.error(err.error));
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Email not valid").required("Email Required"),
    password: Yup.string().required("Password Required"),
  });

  return (
    <Formik
      validateOnMount
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ touched, isValid }) => {
        const disableSubmit = (!touched.email && !touched.password) || !isValid;
        return (
          <Form>
            <Row>
              <Input
                className="mt-3"
                id="login-email"
                name="email"
                type="email"
                placeholder="Insert your email"
                label="Email"
              />
            </Row>
            <Row>
              <Input
                className="mt-3"
                id="login-password"
                name="password"
                type="password"
                placeholder="Insert your password"
                label="Password"
              />
            </Row>
            <Row>
              <Button
                variant="primary"
                type="submit"
                className=" p-3 rounded-3 mt-4  fw-semibold border "
                disabled={disableSubmit}
              >
                Login
              </Button>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
