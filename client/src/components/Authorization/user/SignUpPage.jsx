// this page is the login/ sign up page currently 

// ! Dependencies imported
import CharitySignUp from "./signup/charitySignUp";
import DonorSignUp from "./signup/donorSignUp"
import { Col, Container, Row } from "reactstrap";

const SignUpPage = (props) => {
  //! The container thats holding the signup and log in page.
  return (
    <>
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
    </>
  );
};

export default SignUpPage;