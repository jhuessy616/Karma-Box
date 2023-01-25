
import { Nav, Navbar, Container } from "react-bootstrap";
import logo from "../../assets/img/logo3.png";
import { useHistory } from 'react-router-dom'
import "./ProfileNavBar.css"
import "../home/navbar.css";



const NavBar = () => {


function logOut() {
  localStorage.clear()

}

  return (
    <Navbar expand="sm">
      <Container>
        
          <a className="logolink" href="/">
            <img className="navbarlogo" src={logo} alt="Logo" />
          </a>
      

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
              User Settings
            </Nav.Link>
            <Nav.Link
              href="http://localhost:3000/settings"
              className="navbar-link"
              onClick={logOut}


            >
              Logout
            </Nav.Link>
            <Nav.Link
              href="http://localhost:3000/signup"
              className="navbar-link"
             

            >
              {" "}
              Payment Info
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavBar;
