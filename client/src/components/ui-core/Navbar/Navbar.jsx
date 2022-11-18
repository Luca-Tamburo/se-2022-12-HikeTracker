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
import React from 'react';
import { useContext } from 'react';
import { Container, Navbar as MyNavbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { BiUser } from 'react-icons/bi';

import logo from '../../../assets/logo/logo-no-background.png';

import { AuthContext } from "../../../contexts/AuthContext";

const Navbar = (props) => {
    const { userInfo, isloggedIn } = useContext(AuthContext);
    return (
        <MyNavbar collapseOnSelect bg='light' variant='light' className='shadow p-2 bg-white sticky-top'>
            <Container fluid>
                <MyNavbar.Brand>
                    <img src={logo} alt='Logo Icon' width='230' />
                </MyNavbar.Brand>
                <Link to={'/'}>
                    <FaHome className='home-icon-navbar' />
                </Link>
                {/* TODO: Da cancellare quando avremo la pagina per la localGuide */}
                {isloggedIn && userInfo.role === "localGuide" ? <Link to={'/addHike'}>
                    <Button className='btn-navbar rounded-pill mx-sm-2'>Add Hike</Button>
                </Link> : <></>}
                {!isloggedIn ?
                    <div className='d-flex d-sm-block flex-column justify-content-center align-items-center'>
                        <Link to={'/signup'}>
                            <Button variant='secondary' className='btn-navbar'>SignUp</Button>
                        </Link>
                        <Link to={'/login'}>
                            <Button className='btn-navbar mx-sm-2'>Login</Button>
                        </Link>
                    </div> :
                    <div className='d-flex d-sm-block justify-content-center align-items-center'>
                        <BiUser className='me-2' />
                        {userInfo.role === 'localGuide' ? <Link to={'/addHike'}>
                            <Button className='btn-navbar rounded-pill mx-sm-2'>Add Hike</Button>
                        </Link> : <></>}
                        <span className='fw-bold'>{userInfo.username}</span>
                        <Button className='ms-3' onClick={props.handleLogout}>Logout</Button>
                    </div>
                }
            </Container>
        </MyNavbar>
    );
}

export default Navbar;