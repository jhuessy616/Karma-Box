import { Nav, Navbar, Container } from "react-bootstrap";
import logo from "../../assets/img/logo3.png";
import { useHistory } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "../home/navbar.css";
import baseURL from '../../utils/baseurl'
import jwt_decode from "jwt-decode"

const ProfileNavBar = (props) => {
  function logOut() {
    localStorage.clear();
    props.setSessionToken("")
  }
  const decoded = props.token ? jwt_decode(props.token) : "";
  const navigate = useNavigate();
  
  async function deleteUser(id) {
    
    const url = `http://localhost:4000/user/delete/${id}`;

     let myHeaders = new Headers();
     myHeaders.append("Authorization", props.token);

     let requestOptions = {
       headers: myHeaders,
       method: "DELETE",
     };
     try {
       let response = await fetch(url, requestOptions);
       let data = await response.json();
       console.log(data);
       if (data.message === "User was deleted") {
         alert("Your account has been deleted.")
         localStorage.clear();
         navigate("/")
         props.setSessionToken("");
       } else {
         alert(data.message);
       }
     } catch (err) {
       console.log(err);
     }
   }
  return (
    <Navbar expand="md">
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
              <DropdownToggle
                tag="span"
                caret
                className="nav-link navbar-link user-settings"
                style={{ cursor: "pointer" }}
              >
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
                <DropdownItem>
                  <Nav.Link
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you wish to delete your account?"
                        )
                      ) {
                        deleteUser(decoded.id);
                      }

                      this.onCancel();
                    }}
                    className="navbar-link"
                  >
                    Delete Account
                  </Nav.Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <Nav.Link
              href="https://billing.stripe.com/p/login/test_dR66p8e4bc39gsU4gg"
              // href="http://localhost:3000/setupIntent"
              className="navbar-link"
            >
              {" "}
              Payment
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
