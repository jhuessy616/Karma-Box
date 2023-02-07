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
import baseURL from '../../utils/baseurl'
import jwt_decode from "jwt-decode"

const ProfileNavBar = ({ token }) => {
  // const decoded = token ? jwt_decode(token) : "";
  function logOut() {
    localStorage.clear();
  }

  // async function handleClick(e) {
  //   e.preventDefault()
  //   let url = `${baseURL}/api/billing_portal/sessions`
  //   const myHeaders = new Headers()
  //   myHeaders.append("Authorization", token)
  //   const bodyObject = JSON.stringify({customer: decoded.id})
  //   const requestOptions = {
  //     headers: myHeaders,
  //     method: "POST",
  //     body: bodyObject
  //   };
  //   try {
  //     const response = await fetch(url, requestOptions);
  //     const data = await response.json();
  //     console.log(data)
  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // }

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
                    href="http://localhost:3000/email"
                    className="navbar-link"
                  >
                    Email Update
                  </Nav.Link>
                </DropdownItem>
                <DropdownItem>
                  <Nav.Link
                    href="http://localhost:3000/updatePassword"
                    className="navbar-link"
                  >
                    Password Update
                  </Nav.Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <Nav.Link
              href="https://billing.stripe.com/p/login/test_9AQdR74HY13U3ew000"
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
