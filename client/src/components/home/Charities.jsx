import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./charities.css"
import charity1 from "../../assets/img/migrantjusticelogo.png"
import charity2 from "../../assets/img/ldfwhitetext.png";
import charity3 from "../../assets/img/asylum-accesslogo.jpeg";
import charity4 from "../../assets/img/rotarylogo.jpeg";
import charity5 from "../../assets/img/WWF_logo.svg.png";
import charity6 from "../../assets/img/robsquare.png";
import "./charities.css"
// import arrow1 from "../../assets/img/arrow1.svg";
// import arrow2 from "../../assets/img/arrow2.svg";
// import colorSharp from "../../assets/img/color-sharp.png";
import { Col, Container, Row } from "reactstrap";
function Charities() {
    const responsive = {
    largeDesktop: {
    
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    regularDesktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  return (
    <section className="charity" id="charities">
      <Container className="Container">
        <Row className="row">
          <Col md="12" className="col-12">
            <h2 className="spotlight">This Month's Spotlight Charities</h2>
            <div className="charity-bx wow zoomIn">
              <Carousel
                responsive={responsive}
                infinite={true}
                className="owl-carousel owl-theme charity-slider"
              >
                <div className="item">
                  <a href="https://migrantjustice.net/">
                    <img src={charity1} alt="Charity 1" />
                  </a>
                  <h5>Migrant Justice</h5>
                </div>
                <div className="item">
                  <a href="https://www.naacpldf.org/">
                    <img src={charity2} alt="Charity 2" />
                    <h5>Legal Defense Fund</h5>
                  </a>
                </div>
                <div className="item">
                  <a href="https://asylumaccess.org/">
                    <img src={charity3} alt="Charity 3" />
                    <h5>Asylum Access</h5>
                  </a>
                </div>
                <div className="item">
                  <a href="https://www.rotary.org/en">
                    <img src={charity4} alt="Charity 4" />
                    <h5>Rotary International</h5>
                  </a>
                </div>
                <div className="item">
                  <a href="https://www.worldwildlife.org/">
                    <img src={charity5} alt="Charity 5" />
                    <h5>World Wildlife Foundation</h5>
                  </a>
                </div>

                {/* <div className="item">
                  <img src={charity6} alt="Charity 6" />
                  <h5>Dad Joke Intervention</h5>
                </div> */}
              </Carousel>
            </div>
          </Col>
        </Row>
      </Container>
      {/* <img className="background-image-left" src={colorSharp} alt="Image" /> */}
    </section>
  );
}

export default Charities
