
import { Nav, Navbar, Container } from "react-bootstrap";
import logo from "../../assets/img/logo3.png";
import { useNavigate } from "react-router-dom";

import "./navbar.css";

const NavBar = () => {
 const navigate = useNavigate();
  return (
    <Navbar expand="sm">
      <Container className="navbarcontainer">
        <div className="logodiv">
          <a className="navbarlogolink" href="/">
                      <img className="navbarlogo" src={logo} alt="Logo"
                      />
          </a>
        </div>

        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/" className="navbar-link">
              Home
            </Nav.Link>
            <Nav.Link
              href="http://localhost:3000/about"
              className="navbar-link"
            >
              About
            </Nav.Link>
            <Nav.Link
              href="http://localhost:3000/login"
              className="navbar-link"
            >
              Login
            </Nav.Link>
            <Nav.Link
              href="http://localhost:3000/signup"
              className="navbar-link"
            >
              {" "}
              Signup
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavBar;
