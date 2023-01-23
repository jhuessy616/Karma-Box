import React, { useRef } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import emailjs from "@emailjs/browser";
import FullWidthButton from "../../Buttons/FullWidthButton";



const CharitySignUp = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <>
      <h1>Make it easier for individuals to donate!</h1>
      <h2>Contact us to get approved as a non-profit.</h2>
      <div className="StyledContactForm">
        <Form ref={form} onSubmit={sendEmail}>
          <FormGroup>
            <Label>Name: </Label>
            <Input type="text" name="user_name" />
          </FormGroup>

          <FormGroup>
            <Label>Charity Name:</Label>
            <Input type="text" name="charity_name" />
          </FormGroup>

          <FormGroup>
            <Label>Email</Label>
            <Input type="email" name="user_email" />
          </FormGroup>

          <FormGroup>
            <Label>Charity URL</Label>
            <Input type="text" name="charity_url" />
          </FormGroup>

          <FormGroup>
            <Label>Message</Label>
            <Input type="textarea" name="message" />
            <br></br>
            {/* <Input type="submit" value="Send" /> */}
            <FullWidthButton>
              <Button type="submit" color="primary">
                Sign Up
              </Button>
            </FullWidthButton>
          </FormGroup>
        </Form>
      </div>
    </>
  );
};

export default CharitySignUp;
