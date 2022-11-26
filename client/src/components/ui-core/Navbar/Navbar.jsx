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
import "./Navbar.css";
import React from "react";
import { useContext } from "react";
import {
  Container,
  Navbar as MyNavbar,
  Button,
  Dropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

import logo from "../../../assets/logo/logo-no-background.png";

import { AuthContext } from "../../../contexts/AuthContext";

const Navbar = (props) => {
  const { userInfo, isloggedIn } = useContext(AuthContext);

  return (
    <MyNavbar
      collapseOnSelect
      bg="light"
      variant="light"
      className="shadow p-2 bg-white sticky-top"
    >
      <Container fluid>
        <MyNavbar.Brand /*as={Link} to="/"*/>
          <img src={logo} alt="Logo Icon" width="230" />
        </MyNavbar.Brand>
        <Link to={"/"} data-testid='home-button'>
          <FaHome className="home-icon-navbar" />
        </Link>
        {!isloggedIn ? (
          <div className="d-flex d-sm-block flex-column justify-content-center align-items-center">
            <Link to={"/signup"}>
              <Button variant="secondary" className="btn-navbar">
                SignUp
              </Button>
            </Link>
            <Link to={"/login"}>
              <Button className="btn-navbar mx-sm-2">Login</Button>
            </Link>
          </div>
        ) : userInfo.role === "localGuide" ? (
          <Dropdown drop="start">
            <Dropdown.Toggle variant="primary" id="user-dropdown">
              Hi, {userInfo.name}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/localGuide">
                Profile
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/addHike">
                Add hike
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/addHut">
                Add hut
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/addParking">
                Add parking lot
              </Dropdown.Item>
              <Dropdown.Item onClick={props.handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <div className="d-flex">
            <h4 className="fw-bold mt-2 me-3 p-0">Hi, {userInfo.name}</h4>
            <Button className="rounded-3" onClick={props.handleLogout}>
              Logout
            </Button>
          </div>
        )}
      </Container>
    </MyNavbar>
  );
};

export default Navbar;
