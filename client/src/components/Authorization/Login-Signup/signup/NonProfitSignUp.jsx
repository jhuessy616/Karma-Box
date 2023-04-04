import React, { useRef, useState} from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import emailjs from "@emailjs/browser";
import FullWidthButton from "../../../Buttons/FullWidthButton";
import "./nonprofitsignup.css"
import NavBar from "../../../home/NavBar";



const CharitySignUp = () => {
  const formRef = useRef();
  const [message, setMessage] = useState();
  const [displayMessage, setDisplayMessage] = useState(false);
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          formRef.current.reset();
          setDisplayMessage(true)
          setMessage("Thank you for contacting Karma Box. Our team will respond to your message as soon as possible.")
          console.log(result.text);
        },
        (error) => {
          setDisplayMessage(true);
          setMessage(
            "There was an error in sending your message. Please try again."
          );
          console.log(error.text);
        }
      );
  };
  return (
    <div className="nonprofitsignup">
      <NavBar></NavBar>
      <div className="nonProfitContactForm">
        <h1 className="txtcenter">Make it easier for individuals to donate!</h1>
        <h2 className="txtcenter">
          Contact us to get approved as a Karma Box Organization.
        </h2>
        <Row>
          <Col xs="1" s="2" md="2" lg="3"></Col>
          <Col xs="10" s="8" md="8" lg="6">
            <Form innerRef={formRef} onSubmit={sendEmail}>
              <FormGroup floating>
                <Input
                  type="text"
                  name="user_name"
                  placeholder="Name"
                  id="user_name"
                  required
                />
                <Label for="user_name">Name </Label>
              </FormGroup>

              <FormGroup floating>
                <Input
                  type="email"
                  name="user_email"
                  placeholder="Email"
                  id="email"
                  required
                />
                <Label for="user_email">Email</Label>
              </FormGroup>

              <FormGroup floating>
                <Input
                  type="text"
                  id="charity_name"
                  name="charity_name"
                  placeholder="Organization's Name"
                  required
                />
                <Label for="charity_name">Organization's Name</Label>
              </FormGroup>

              <FormGroup floating>
                <Input
                  type="url"
                  id="url"
                  name="charity_url"
                  placeholder="Nonprofit URL"
                  
                />
                <Label for="charity_url">Organization's URL</Label>
              </FormGroup>

              <FormGroup floating>
                <Input
                  rows="3"
                  type="textarea"
                  name="message"
                  id="message"
                  placeholder="Message"
                  style={{ height: "100px" }}
                  
                />
                <Label for="message">Message</Label>
              </FormGroup>

              <FormGroup>
                {/* <Input type="submit" value="Send" /> */}
                <FullWidthButton>
                  <Button type="submit" color="primary">
                    Contact Us
                  </Button>
                </FullWidthButton>
              </FormGroup>
            </Form>
          </Col>
          <Col xs="1" s="2" md="2" lg="3"></Col>
          {displayMessage ? <p className="txtcenter">{message}</p> : <></>
            // <h1></h1>
          }
        </Row>
      </div>
    </div>
  );
};

export default CharitySignUp;
