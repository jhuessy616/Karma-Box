import { Nav, Navbar, Container } from "react-bootstrap";
import logo from "../../assets/img/logo3.png";
import { useHistory } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import "../home/navbar.css";

const ProfileNavBar = () => {
  function logOut() {
    localStorage.clear();
  }

  return (
    <Navbar expand="sm">
      <Container>
        <div className="logodiv">
          <a className="navbarlogolink" href="/">
            <img className="navbarlogo" src={logo} alt="Logo" />
          </a>
        </div>

        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/profile" className="navbar-link">
              Profile
            </Nav.Link>

            <UncontrolledDropdown
              // className="me-2"
              direction="down"
            >
              <DropdownToggle tag="span" caret className="nav-link navbar-link">
                User Settings
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <Nav.Link
                    href="http://localhost:3000/settings"
                    className="navbar-link"
                  >
                    Email Update
                  </Nav.Link>
                </DropdownItem>
                <DropdownItem>
                  <Nav.Link
                    href="http://localhost:3000/password"
                    className="navbar-link"
                  >
                    Password Update
                  </Nav.Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <Nav.Link
              href="http://localhost:3000/setupIntent"
              className="navbar-link"
            >
              {" "}
              Payment Info
            </Nav.Link>
            <Nav.Link
              href="http://localhost:3000/"
              className="navbar-link"
              onClick={logOut}
            >
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default ProfileNavBar;
