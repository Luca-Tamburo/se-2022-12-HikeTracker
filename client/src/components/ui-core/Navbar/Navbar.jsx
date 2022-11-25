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
import { Container, Navbar as MyNavbar, Button, Dropdown } from 'react-bootstrap';
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
                {!isloggedIn ?
                    <div className='d-flex d-sm-block flex-column justify-content-center align-items-center'>
                        <Link to={'/signup'}>
                            <Button variant='secondary' className='btn-navbar'>SignUp</Button>
                        </Link>
                        <Link to={'/login'}>
                            <Button className='btn-navbar mx-sm-2'>Login</Button>
                        </Link>
                    </div> :
                    (
                        userInfo.role === "localGuide" ?
                            <>
                                <BiUser className='me-2' />
                                <Dropdown>
                                    <Dropdown.Toggle variant="primary" id="user-dropdown">
                                        Hi, {userInfo.username}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>
                                            <Link to={'/addHike'}>
                                                Add hike
                                            </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <Link to={'/addHut'}>
                                                Add hut
                                            </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <Link to={'/addParking'}>
                                                Add parking lot
                                            </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={props.handleLogout}>Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </> : <></>
                    )
                }
            </Container>
        </MyNavbar>
    );
}

export default Navbar;