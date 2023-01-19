// this page is the login/ sign up page currently 

// ! Dependencies imported

import { Col, Container, Row } from "reactstrap";
import Login from "./login/Login";

const LoginPage = (props) => {
  //! The container thats holding the signup and log in page.
  return (
    <>
      <Container>
        <Row>
          <Col md="6">
            <Login updateToken={props.updateToken} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginPage;
