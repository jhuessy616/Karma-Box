import { Nav, Navbar, Container } from "react-bootstrap";
import logo from "../../assets/img/logo3.png";
import "../home/navbar.css"

const AdminNavBar = (props) => {
  function logOut() {
    localStorage.clear();
    props.setSessionToken("");
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
            <Nav.Link href="/admin" className="navbar-link">
              Donations
            </Nav.Link>
            <Nav.Link href="/allDonations" className="navbar-link">
              Users
            </Nav.Link>
            <Nav.Link
              href="https://dashboard.stripe.com/test/payments"
              className="navbar-link"
            >
              Stripe
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
export default AdminNavBar;
