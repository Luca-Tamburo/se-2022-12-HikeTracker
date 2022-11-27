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

// Imports
import { Button } from "react-bootstrap";
import { Formik, Form } from "formik";

// Components - utils
import * as CustomField from "../../utils/Input/index";

// Validations
import LoginSchema from "../../../validation/LoginSchema";

const LoginForm = (props) => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={(values) => props.handleSubmit(values)}
    >
      {({ touched, isValid }) => {
        const disableSubmit = (!touched.email && !touched.password) || !isValid;
        return (
          <Form>
            <CustomField.Input id="login-email" name="email" type="email" placeholder="Insert your email" label="Email" />
            <CustomField.Input className="mt-3" id="login-password" name="password" type="password" placeholder="Insert your password" label="Password" />
            <Button variant="primary" type="submit" className="w-100 fw-semibold border mt-4 py-2" disabled={disableSubmit}>
              Login
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
