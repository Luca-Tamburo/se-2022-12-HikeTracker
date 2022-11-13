/*
* --------------------------------------------------------------------
*
* Package:         client
* Module:          views
* File:            EmailErr.js
*
* Description:     Email not confirmed page
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

import { Row, Col, Dropdown, Table, Button } from "react-bootstrap";

const EmailConf = ()=>{
    return(  <div className='mb-5 d-flex flex-column justify-content-center align-items-center' style={{ zIndex: 99 }}>
    <Row>
    <h1 className='text-center fw-bold fst-italic mb-4 text-danger'>Wrong confirmation code or user already confirmed</h1>
    </Row>
    <Row>
    <p className='text-center fw-bold fst-italic mb-4'>Return to homepage or try again</p></Row>
    </div>
    );
}

export default EmailConf;