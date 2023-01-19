// ! Dependencies imported
// ! Styling imported from reactstrap
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useState } from "react";
import FullWidthButton from "../../Buttons/FullWidthButton";
import { useNavigate } from "react-router-dom";

//! Declaration of Vairables
const DonorSignup = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    //!Url our page is hosed on
    let url = `http://localhost:4000/user/signup`;
    let bodyObject = JSON.stringify({ firstName, lastName, email, password });

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
        navigate("/room");
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
      <h2>Sign up to be a donor!</h2>
      <div style={{ backgroundColor: "lightcyan" }}>
        <Form onSubmit={handleSubmit}>
          <FormGroup floating>
            <Input
              id="exampleEmail"
              name="email"
              placeholder="Email:"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Label for="exampleEmail">Email</Label>
          </FormGroup>{" "}
          <FormGroup floating>
            <Input
              id="examplePassword"
              name="password"
              placeholder="Password:"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Label for="examplePassword">Password</Label>
          </FormGroup>{" "}
          <FormGroup floating>
            <Input
              id="examplePassword"
              name="password"
              placeholder="Password:"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Label for="examplePassword">Confirm Password</Label>
          </FormGroup>{" "}
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

export default DonorSignup;