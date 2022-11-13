/*
* --------------------------------------------------------------------
*
* Package:         client
* Module:          views
* File:            EmailConf.js
*
* Description:     Email confirmed page
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

import { Row, Col, Dropdown, Table, Button, Container } from "react-bootstrap";

const EmailConf = ()=>{
    return(
     <div className='mb-5 d-flex flex-column justify-content-center align-items-center' style={{ zIndex: 99 }}>
    <Row>
    <h1 className='text-center fw-bold fst-italic mb-4 text-success' >Account successfully confirmed!</h1></Row>
    <Row>
    <p className='text-center fw-bold fst-italic mb-4'>Now login to use your account or go back to homepage</p></Row>
    </div>
    );
}

export default EmailConf;