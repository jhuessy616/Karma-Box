// this page is the login/ sign up page currently 

// ! Dependencies imported
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
					<Col lg="4.5" md="4" xs="2"></Col>
          <Col lg="3" md="4" xs="8">
            <DonorSignUp updateToken={props.updateToken} />
          </Col>
          <Col lg="4.5" md="4" xs="2"></Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUpPage;