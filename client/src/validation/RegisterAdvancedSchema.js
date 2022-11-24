/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/validation
* File:            RegisterAdvancedSchema.hs
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup); // extend yup

const RegisterAdvancedSchema = Yup.object().shape({
    username: Yup.string().required("Username requested").matches(
        /^[A-Za-z_][A-Za-z0-9_]+$/,
        "Not valid username"
    ),
    email: Yup.string().email("Email is not valid").required("Email needed"),
    name: Yup.string().required("Name needed"),
    surname: Yup.string().required("Name needed"),
    password: Yup.string().password().required("Password needed"),
    passwordConfirmation: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
    ),
    phoneNumber: Yup.number().required("Phone number needed"),
    gender: Yup.string().oneOf(['M', 'F', 'U']),
});

export default RegisterAdvancedSchema;