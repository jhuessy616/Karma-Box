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
  const toRotate = [
    "Giving",
    "Helping",
    "Easy",
    "Helpful",
    "Caring",
  ];
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
        <div className="align-items-center">
          <h1 className="KbDescription">
            {" "}
            
              Karma Box is {""}
              {/* {"Karma Box is..."} */}
              {/* <br></br> */}
              {text == "" ? <br></br> : null}
              <span className="wrap">{text}</span>
        
          </h1>
          <h2>
            Our goal is to connect non-profits and donors and to make giving
            easier.
                  </h2>
                  {/* <h1 className="earning">Start Earning Your Good Karma Today</h1> */}
          <button className="connectButton" onClick={() => console.log("connect")}>
            Let's Connect <ArrowRightCircle size={25} />
          </button>

          {/* <img className="header" src={headerImg} alt="Header Image" /> */}
       
        
          <About></About>
        </div>
      </Container>
    </section>
  );
}

export default Banner;
