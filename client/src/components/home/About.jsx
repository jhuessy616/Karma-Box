
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
         
        
        </Row>
      </Container>
    </div>
  );
}

export default About
