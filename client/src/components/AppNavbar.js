import React, { Component, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
} from "reactstrap";

const AppNavbar = ({ user }) => {
  const history = useHistory();
  const [ isOpen, setIsOpen ] = useState(false);

  useEffect(() => {
    // console.log(user);
  });

  const toggle = () => {
    setIsOpen(!isOpen);
  }

  const logOutUser = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("ex-user");
    window.location.reload(false);
  }

  return (
    <div>
      <Navbar color="dark" dark expand="sm">
        <Container>
          <NavbarBrand href="/">My Travel Diaries</NavbarBrand>
          <NavbarToggler onClick={toggle}/>
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink href="https://github.com/GauravKr0715" target="_blank">Github</NavLink>
                </NavItem>
            </Nav>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
              {user.username}
              </DropdownToggle>
              <DropdownMenu color="dark" dark right>
                <DropdownItem onClick={logOutUser}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default AppNavbar;