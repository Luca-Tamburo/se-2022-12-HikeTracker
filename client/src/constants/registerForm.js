/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/constants
* File:            registerForm.js
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Register field info
const registerForm = [
    {
        id: 'signup-username',
        name: 'username',
        type: 'text',
        placeholder: 'Insert your username',
        label: 'Username',
    },
    {
        id: 'signup-email',
        name: 'email',
        type: 'email',
        placeholder: 'Insert your email',
        label: 'Email',
    },
    {
        id: 'signup-password',
        name: 'password',
        type: 'password',
        placeholder: 'Insert your password',
        label: 'Password',
    },
    {
        id: 'signup-confirmation-password',
        name: 'passwordConfirmation',
        type: 'password',
        placeholder: 'Confirm your password',
        label: 'Confirm password',
    },
]

export default registerForm;