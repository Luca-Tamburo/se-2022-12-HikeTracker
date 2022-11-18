/*
* --------------------------------------------------------------------
*
* Package:         client
* Module:          views
* File:            EmailErr.js
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

const EmailConf = () => {
    return (
        <div className='mb-5 d-flex flex-column justify-content-center align-items-center'>
            <h1 className='text-center fw-bold fst-italic mb-4 text-danger'>Wrong confirmation code or user already confirmed</h1>
            <p className='text-center fw-bold fst-italic mb-4'>Return to homepage or try again</p>
        </div >
    );
}

export default EmailConf;