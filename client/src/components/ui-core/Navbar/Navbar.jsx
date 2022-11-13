/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/components/Navbar
* File:            Navbar.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

//Imports
import './Navbar.css';
import { Container, Navbar as MyNavbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa'
import {FiUserPlus, FiUserCheck} from 'react-icons/fi'

import logo from '../../../assets/logo/logo-no-background.png';

const Navbar = () => {
    return (
        <MyNavbar collapseOnSelect bg='light' variant='light' className='shadow p-2 bg-white sticky-top'>
            <Container fluid>
                <MyNavbar.Brand>
                    <img
                        src={logo}
                        alt='Logo Icon'
                        width='230'
                    />
                </MyNavbar.Brand>
                <Link to={'/'}>
                    <FaHome className='home-icon-navbar' />
                </Link>
                <div className='d-flex d-sm-block flex-column justify-content-center align-items-center'>
                    <Link to={'/signup'}>
                        
                        <Button variant='secondary' className='btn-navbar rounded-pill'><FiUserPlus className='signup-icon-navbar'/> SignUp</Button>
                    </Link>
                    <Link to={'/login'}>
                    
                        <Button className='btn-navbar rounded-pill mx-sm-2'><FiUserCheck className='login-icon-navbar'/> Login</Button>
                    </Link>
                </div>
            </Container>
        </MyNavbar>
    );
}

export default Navbar;