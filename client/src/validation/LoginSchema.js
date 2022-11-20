/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/validation
* File:            LoginSchema.hs
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Email not valid").required("Email Required"),
    password: Yup.string().required("Password Required"),
});

export default LoginSchema;