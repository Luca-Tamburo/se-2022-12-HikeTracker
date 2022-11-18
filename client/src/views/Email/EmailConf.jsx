/*
* --------------------------------------------------------------------
*
* Package:         client
* Module:          views
* File:            EmailConf.js
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

const EmailConf = () => {
    return (
        <div className='mb-5 d-flex flex-column justify-content-center align-items-center'>
            <h1 className='text-center fw-bold fst-italic mb-4 text-success'>Account successfully confirmed!</h1>
            <p className='text-center fw-bold fst-italic mb-4'>Now login to use your account or go back to homepage</p>
        </div>
    );
}

export default EmailConf;