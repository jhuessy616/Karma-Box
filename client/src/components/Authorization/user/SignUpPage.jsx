// this page is the login/ sign up page currently 

// ! Dependencies imported
import CharitySignUp from "./signup/charitySignUp";
import DonorSignUp from "./signup/donorSignUp"
import { Col, Container, Row } from "reactstrap";
import "./SignUpPage.css"
import Navbar from "../../home/NavBar"

const SignUpPage = (props) => {
  //! The container thats holding the signup and log in page.
  return (
    <div className="Background">
      <Navbar></Navbar>
      <Container>
        <Row>
          <Col md="6">
            <DonorSignUp updateToken={props.updateToken} />
          </Col>
          <Col md="6">
            <CharitySignUp updateToken={props.updateToken} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUpPage;