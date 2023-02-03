// ! Dependencies imported
// ! Styling imported from reactstrap
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useRef } from "react";
import FullWidthButton from "../../Buttons/FullWidthButton";
import { useNavigate } from "react-router-dom";

//! Declaration of Vairables
const CharitySignupOriginal = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    //!Url our page is hosed on
    let url = `http://localhost:4000/user/signup`;
    let bodyObject = JSON.stringify({ email, password });

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      headers: myHeaders,
      body: bodyObject,
      method: "POST",
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log(data);
      if (data.message === "Success") {
        //We are free to navigate to another page
        props.updateToken(data.token);
        navigate("/profile");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  }


  return (
    <>
      <h1>Contact us to become an approved Non-Profit</h1>
      <h2>Sign up your charity!</h2>
      <div style={{ backgroundColor: "lightcyan" }}>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Email: </Label>
            <Input type="email" innerRef={emailRef} />
          </FormGroup>
          <FormGroup>
            <Label>Password: </Label>
            <Input type="password" innerRef={passwordRef} />
          </FormGroup>
          <FormGroup>
            <Label>Confirm Password:</Label>
            <Input type="password" innerRef={confirmPasswordRef} />
          </FormGroup>
          <br></br>
          <FullWidthButton>
            <Button type="submit" color="primary">
              Sign Up
            </Button>
          </FullWidthButton>
        </Form>
      </div>
    </>
  );
};

export default CharitySignupOriginal;
