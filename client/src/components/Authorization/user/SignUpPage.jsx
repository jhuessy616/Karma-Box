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
      <div>
        <h1 className="txtcenter">Begin earning your good karma today!</h1>
        <h2 className="txtcenter" >Sign up to be a donor!</h2>
        <Row>
          <Col lg="3" md="4" xs="8"></Col>
          

            <DonorSignUp updateToken={props.updateToken} />
          </div>
          <Col lg="4.5" md="4" xs="2"></Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUpPage;