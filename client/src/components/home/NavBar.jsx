import { useState, useEffect } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import logo from "../../assets/img/logo3.png";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
// import { HashLink } from 'react-router-hash-link'
// import { BrowserRouter as Router } from "react-router-dom";

import "./navbar.css";

const NavBar = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };
  return (
    // <Router>
    <Navbar expand="lg" className={scrolled ? "scrolled" : ""}>
      <Container>
        <Navbar.Brand href="/">
          <img className="navbarlogo" src={logo} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              href="#home"
              className={
                activeLink === "home" ? "active navbar-link" : "navbar-link"
              }
              //   onClick={() => onUpdateActiveLink("home")}
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="#about"
              className={
                activeLink === "about" ? "active navbar-link" : "navbar-link"
              }
              //   onClick={() => onUpdateActiveLink("about")}
            >
              About
            </Nav.Link>
            <Nav.Link
              href="http://localhost:3000/login"
              className={
                activeLink === "login" ? "active-navbar-link" : "navbar-link"
              }
              //   onClick={() => onUpdateActiveLink("login")}
            >
              Login
            </Nav.Link>

            <UncontrolledDropdown nav inNavbar>
              <Nav.Link
                className={
                  activeLink === "signup" ? "active-navbar-link" : "navbar-link"
                }
                //   onClick={() => onUpdateActiveLink("signup")}
              >
                <DropdownToggle tag="span" className="crazy">
                  Sign Up
                </DropdownToggle>
              </Nav.Link>
              <DropdownMenu dark>
                <DropdownItem>
                  {" "}
                  <Nav.Link
                    href="http://localhost:3000/signup"
                    className={
                      activeLink === "donorsignup"
                        ? "active-navbar-link"
                        : "navbar-link"
                    }
                    //   onClick={() => onUpdateActiveLink("donorsignup")}
                  >
                    {" "}
                    Donor Signup
                  </Nav.Link>
                </DropdownItem>

                <DropdownItem>
                  <Nav.Link
                    href="http://localhost:3000/signup"
                    className={
                      activeLink === "nonprofitsignup"
                        ? "active-navbar-link"
                        : "navbar-link"
                    }
                    //   onClick={() => onUpdateActiveLink("charitysignup")}
                  >
                    {" "}
                    Non Profit Signup
                  </Nav.Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    // </Router>
  );
};
export default NavBar;
