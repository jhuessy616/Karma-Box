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
              <h4 className="DonorH4">
                <ul>
                  <li>
              Simplified, 1-click giving to any approved nonprofits.</li>
              <li>Track and aggregate charitable contributions across the web to streamline tax deductions.*</li>
              <li>Create personalized peer-to-peer fundraising campaign for approved nonprofits.*</li>
            
              
              <h6>
              * Features coming soon!
              </h6>
              </ul>
              </h4>
              <h3 className="DonorH3">
                Begin earning good karma, sign up as a donor today!
              </h3>
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
