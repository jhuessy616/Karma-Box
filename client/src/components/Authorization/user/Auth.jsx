// ! Dependencies imported
import SignupDonor from "./signup/charitySignUp";
import SignupCharity from "./login/Login"
import { Col, Container, Row } from "reactstrap";
import Login from "./signup/donorSignUp";

const Auth = (props) => {
  //! The container thats holding the signup and log in page.
  return (
    <>
      <Container>
        <Row>
          <Col md="6">
            <SignupDonor updateToken={props.updateToken} />
          </Col>
          <Col md="6">
            <SignupCharity updateToken={props.updateToken} />
          </Col>
          <Col md="6">
            <Login updateToken={props.updateToken} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Auth;
