// ! Dependencies imported
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// ! Styling imported from reactstrap
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Col,
  Container,
  Row,
} from "reactstrap";
import FullWidthButton from "../../Buttons/FullWidthButton";
import Navbar from "../../../home/NavBar";
import "./login.css";



function ForgotPassword(props) {
  const formRef = useRef();
    const emailRef = useRef();
     const [message, setMessage] = useState();

  async function handleSubmit(e) {
    e.preventDefault();
    // will set the constants to the input that is in the form
    const email = emailRef.current.value;

    // the url to create a message
    let url = `http://localhost:4000/user/forgotpassword`;
    // the bodyobject we are sending the the server
    let bodyObject = JSON.stringify({ email });
    // Sending headers that will pass the Authorization token and send the content type as json
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    //   myHeaders.append("Authorization", props.token);
    // complete request to send to the server
    const requestOptions = {
      headers: myHeaders,
      body: bodyObject,
      method: "POST",
    };
    // try where we will await a response from the server and create a room
    try {
      const response = await fetch(url, requestOptions);
        const data = await response.json();

        const link = data.link
        var templateParams = {
          link: link
        };

        emailjs
          .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams)
          .then(
            function (response) {
              console.log("SUCCESS!", response.status, response.text);
            },
            function (error) {
              console.log("FAILED...", error);
            }
          );

      // reset the form
        formRef.current.reset();

        
         
          setMessage(data.message);
        
      // Catch for server errors
    } catch (error) {
      console.log(error.message);
    }
  }
  //! Input field where user enters information

  return (
    <div className="Background">
      <Navbar></Navbar>
      <Container className="forgotPasswordFormContainer">
        <h1 className="txtcenter">Send a link to reset your password</h1>
        <Row>
          <Col lg="4" md="4" xs="2"></Col>
          <Col lg="4" md="4" xs="8">
            <div>
              <Form innerRef={formRef} onSubmit={handleSubmit}>
                <FormGroup floating>
                  <Input
                    id="email"
                    name="email"
                    placeholder="Email"
                    type="email"
                    innerRef={emailRef}
                  />
                  <Label for="email">Email</Label>
                </FormGroup>{" "}
                <FullWidthButton>
                  <Input
                    type="submit"
                    value="Reset Password"
                   
                  ></Input>
                </FullWidthButton>
              </Form>
            </div>
          </Col>
                  <Col lg="4" md="4" xs="2"></Col>
                  <p className="txtcenter">{message}</p>
        </Row>
      </Container>
    </div>
  );
}

export default ForgotPassword;
