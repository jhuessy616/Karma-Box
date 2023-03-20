import React from 'react'
import { Col, Row } from 'reactstrap'
import fishingline from "../../assets/img/fishingline.png"
import tirewater from "../../assets/img/tirewater.png";
import hooks from "../../assets/img/hooks.png";
import mermaid1 from "../../assets/img/Mattsmeredit.png"
import mermaid2 from "../../assets/img/MorgansMeredit.png"
import mermaid3 from "../../assets/img/BensMeredit2.png";
function Images() {
  return (
    // <div className="mermaidimages">
        <div className="plasticimages"> 
      {/* USE Below */}
      <img src={fishingline} />
      {/* <img style={{ width: 600 }} src={mermaid1} /> */}

      <img src={tirewater} />
      {/* <img style={{ width: 700 }} src={mermaid2} /> */}

      <img src={hooks} />
      {/* <img style={{width:600}} src={mermaid3} /> */}

      {/* </Col> */}
      {/* </Row> */}
   
    </div>
  );
}

export default Images
