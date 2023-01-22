
import { Col, Container, Row } from 'reactstrap'
import "./about.css"
function About() {

  return (
    <div>
      <Container className="AboutContainer">
        <Row>
          {/* <Col md="5"> */}
          <div className="DonorWelcome">
            <h3 className="DonorH3">
              Giving causes the release of Oxytocin, the hormone that induces
              feelings of warmth, euphoria, and connection.
            </h3>
            <h4 className="DonorH4">
              Come jump into euphoria with us, sign up as a donor today!
            </h4>
            <button className="KBSignUpButton">Sign Up</button>
          </div>
          {/* </Col> */}
          {/* <Col md="2"></Col> */}
          {/* <Col md="5"> */}
          <div className="CharityWelcome">
            <h3 className="CharityH3">
              Make it easier for Users to Donate. Having easily accessible
              donations can increase donations by 400%.
            </h3>
            <h4 className="CharityH4">Sign up as a Non-Profit today!</h4>
            <button className="KBSignUpButton">Sign Up</button>
          </div>
          {/* </Col> */}
        </Row>
      </Container>
    </div>
  );
}

export default About
