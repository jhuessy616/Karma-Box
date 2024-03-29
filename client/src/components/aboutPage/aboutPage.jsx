import { Container } from 'reactstrap'
import "./aboutPage.css"
import Burlington from "../../assets/img/burlington.jpeg"
import Stripe from "../../assets/img/Stripe.png"
import Navbar from "../home/NavBar"
function AboutPage() {



  return (
    <section className="About">
      <Navbar></Navbar>
      <Container>
    
        <div className="about">
          <img className="aboutimage" src={Burlington} alt="Burlington"></img>
          <p className="aboutParagraph">
            KarmaBox is a donation platform tailored towards the needs of
            non-profits and charities. When we started KarmaBox in 2023, our
            goal was to make donating to charities and non-profits as fun as it
            felt, with as few steps as possible. We wanted to make access to a
            streamlined donation platform as easy as possible for both the donor
            and the charity through an easily embeddable widget or button on
            charities or non-profits websites for donors to easily donate.
            <br></br>
            <br></br>
            Where did the idea come from? KarmaBox's founder Clay Curran worked
            with non-profits and saw first hand how difficult it was for people
            to donate to charities so he wanted to create an easier way for
            donors to give donations and for charities and non-profits to
            recieve donations.
            <br></br>
            <br></br>
            Thank you for choosing KarmaBox and start earning your good karma
            today!
          </p>
        </div>
        {/* </Col> */}
        {/* </Row>
          <Row>
          <Col lg="2.5" md="4" xs="2">
        </Col>
		<Col lg="2.5" md="4" xs="8"> */}

        <div>
          <img src={Stripe} alt="Stripe" className="stripelogo"></img>
        </div>
        {/* </Col>
          <Col lg="2.5" md="4" xs="2"></Col>
          
          {/* </Col> */}
        {/* </Row> */}
      </Container>
    </section>
  );
}

export default AboutPage 
