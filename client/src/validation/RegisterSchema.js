/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/validation
* File:            RegisterSchema.hs
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports
import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup); // extend yup

const RegisterSchema = Yup.object().shape({
    username: Yup.string().required("Username requested").matches(
        /^[A-Za-z_][A-Za-z0-9_]+$/,
        "Not valid username"
    ),
    email: Yup.string().email("Email is not valid").required("Email needed"),
    password: Yup.string().password().required("Password needed"),
    passwordConfirmation: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
    ).required("Confirmation password needed"),
});

export default RegisterSchema;