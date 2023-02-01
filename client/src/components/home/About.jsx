import { Col, Container, Row } from "reactstrap";
import "./about.css";
import { useNavigate } from "react-router-dom";
function About() {
      const navigate = useNavigate();
  return (
    <div>
      <Container className="AboutContainer">
        <Row>
          {/* <Col md="5"> */}
          <div className="DonorWelcome">
            <div className="AboutText">
              <h3 className="DonorH3">
                Giving causes the release of oxytocin, the hormone that induces
                feelings of warmth, euphoria, and connection.
              </h3>
              <h4 className="DonorH4">
                Come jump into euphoria with us, sign up as a donor today!
              </h4>
            </div>
          
              <button
                onClick={() => navigate("/signup")}
                className="KBSignUpButton"
              >
                Sign Up
              </button>
           
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default About;
