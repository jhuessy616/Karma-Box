// ! Dependencies imported
// ! Styling imported from reactstrap
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useRef} from "react";
import FullWidthButton from "../../Buttons/FullWidthButton";
import { useNavigate } from "react-router-dom";
import "./donorSignUp.css"

//! Declaration of Vairables
const DonorSignup = (props) => {
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
    let bodyObject = JSON.stringify({  email, password });

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      headers: myHeaders,
      body: bodyObject,
      method: "POST",
    };
    //! function that runs when the user hits the signup button, that then allows them to log in
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

  //! Input field where user enters information
  return (
    <>
      <h1>Begin earning your good karma today!</h1>
      <h2>Sign up to be a donor!</h2>
      <div>
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
          </FormGroup><br></br>
          <FullWidthButton>
            <Button type="submit" color="warning">
              Sign Up
            </Button>
          </FullWidthButton>
        </Form>
      </div>
    </>
  );
};

export default DonorSignup;