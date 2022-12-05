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
import { useContext } from "react";
import { Container, Navbar as MyNavbar, Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

// Styles
import logo from "../../../assets/logo/logo-no-background.png";

// Contexts
import { AuthContext } from "../../../contexts/AuthContext";

const Navbar = (props) => {
  const { userInfo, isloggedIn } = useContext(AuthContext);

  return (
    <MyNavbar collapseOnSelect bg="light" variant="light" className="shadow p-2 bg-white sticky-top">
      <Container fluid>
        <MyNavbar.Brand as={Link} to="/" data-testid='home-logo-button'>
          <img src={logo} alt="Logo Icon" width="230" />
        </MyNavbar.Brand>
        <Link to={"/"} data-testid='home-icon-button'>
          <FaHome className="home-icon-navbar" />
        </Link>
        {!isloggedIn ?
          (<div className="d-flex d-sm-block flex-column justify-content-center align-items-center">
            <Link to={"/signup"}>
              <Button variant="secondary" className="btn-navbar mb-2 mb-sm-0">
                SignUp
              </Button>
            </Link>
            <Link to={"/login"}>
              <Button className="btn-navbar mx-sm-2">Login</Button>
            </Link>
          </div>) : (
            <Dropdown drop="start">
              <Dropdown.Toggle variant="primary" id="user-dropdown">
                Hi, {userInfo.name || userInfo.username}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {
                  userInfo.role === "localGuide" &&
                  <>
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
                  </>
                }
                <Dropdown.Item onClick={props.handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
      </Container>
    </MyNavbar >
  );
};

export default Navbar;
