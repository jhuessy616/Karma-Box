import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import logo from "../../assets/img/logo3.png";
import About from "./About";
// import headerImg from "../../assets/img/header-img.svg"
import "./banner.css";

function Banner() {
  // Set up to have changing text
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const toRotate = ["Giving", "Helping", "Easy", "Helpful", "Caring"];
  const [text, setText] = useState("");
  // How fast the letters come one after another
  const [delta, setDelta] = useState(200 - Math.random() * 100);
  // Transition time between each words
  const period = 2000;

  // Interval between text getting updated
  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);
    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  // tick function
  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);
    if (isDeleting) {
      setDelta(200);
    }
    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(200);
    }
  };

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} xl={7}>
            <h1>
              {" "}
              <span className="tagline">Karma Box is...</span>
            </h1>
            <h1>
              {/* {"Karma Box is..."} */}
              {/* <br></br> */}
              {text == "" ? <br></br> : null}
              <span className="wrap">{text}</span>
            </h1>
            <h2>
              Our goal is to connect non-profits and donors and to make giving
              easier.
            </h2>
            <button onClick={() => console.log("connect")}>
              Let's Connect <ArrowRightCircle size={25} />
            </button>
          </Col>
          <Col xs={12} md={6} xl={5}>
            {/* <img className="header" src={headerImg} alt="Header Image" /> */}
            <img className="logo" src={logo} alt="logo Image" />
          </Col>
        </Row>
        <Row>
          <About></About>
        </Row>
      </Container>
    </section>
  );
}

export default Banner;
