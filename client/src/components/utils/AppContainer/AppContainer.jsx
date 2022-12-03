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
import { Row, Container, Button} from "react-bootstrap";
import { ArrowUp } from 'react-bootstrap-icons';

//Components
import Navbar from '../../../components/ui-core/Navbar/Navbar'
import './AppContainer.css'

const AppContainer = ({ ...props }) => {

    let mybutton;

    let container = document.getElementById("idContainer")

    if (container) {
        container.onscroll = function () {
            console.log('entra')
            mybutton = document.getElementById("btn-back-to-top");
            scrollFunction(mybutton);
        };
    }

    function scrollFunction(mybutton) {
        console.log(container.scrollTop)
        if (
            container.scrollTop > 20
        ) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }

    function backToTop() {

        console.log('entra nel bottone')
        container.scrollTop = 0;

    }

    return (
        <Container fluid className='app-container' id='idContainer'>
            <Navbar handleLogout={props.handleLogout} />
            <Row className='flex-fill p-0'>
                {props.children}
            </Row>
            <Button onClick={backToTop} id='btn-back-to-top'>
                <ArrowUp />
            </Button>
        </Container >
    );
}

export default AppContainer;