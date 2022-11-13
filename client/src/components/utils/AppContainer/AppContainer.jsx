/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/components/utils
* File:            AppContainer.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

//Imports
import { Row, Container } from "react-bootstrap";

//Components
import Navbar from '../../../components/ui-core/Navbar/Navbar'

const AppContainer = ({ ...props }) => {

    return (
        <Container fluid className='app-container'>
            <Navbar />
            <Row className='flex-fill p-0'>
                {props.children}
            </Row>
        </Container >
    );
}

export default AppContainer;