import React from 'react'
import { Col, Row } from 'reactstrap'
import fishingline from "../../assets/img/fishingline.png"
import tirewater from "../../assets/img/tirewater.png";
import hooks from "../../assets/img/hooks.png";
function Images() {
  return (
    <div className="plasticimages">
      {/* <Row className="plasticimages"> */}
        {/* <Col md="4" className="imagecolumn"> */}
          <img src={fishingline} />
         
        {/* </Col> */}
        {/* <Col md="4" className="imagecolumn"> */}
          <img src={tirewater} />
        
        {/* </Col>

        <Col md="4" className="imagecolumn"> */}
          <img src={hooks} />
         
        {/* </Col> */}
      {/* </Row> */}
    </div>
  );
}

export default Images
