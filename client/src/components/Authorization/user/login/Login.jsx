// ! Dependencies imported
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
// ! Styling imported from reactstrap
import {
	InputGroupAddon,
	InputGroup,
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


//! Declaration of Variables
const Login = (props) => {
	const emailRef = useRef();
	const passwordRef = useRef();
  const navigate = useNavigate();
    const [message, setMessage] = useState();
	// const [loginError, setLoginError] = useState("");
	// const [loginErrorClass, setLoginErrorClass] = useState("none");

	const [state, setState] = useState(false);
	const toggleBtn = (e) => {
		e.preventDefault()
		setState(prevState => !prevState);
	}

	async function handleSubmit(e) {
		e.preventDefault();

		const email = emailRef.current.value;
		const password = passwordRef.current.value;

		// if (email === "" || password === "") {
		// 	setLoginError("missing input");
		// 	setLoginErrorClass("some");
		// 	return;
		// }
		//!Url our page is hosed on
		let url = `http://localhost:4000/user/login`;

		let bodyObject = JSON.stringify({ email, password });

		let myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		const requestOptions = {
			headers: myHeaders,
			body: bodyObject,
			method: "POST",
		};
		//! function that runs when the user hits the login button to bring to new page
		try {
			const response = await fetch(url, requestOptions);
			const data = await response.json();
			console.log(data);
			if (data.message === "Success") {
				//We are free to navigate to another page
				props.updateToken(data.token);
				// if (props.user.isCharity === false)
				navigate("/profile");
			} else {
				setMessage(data.message);
			}
		} catch (error) {
			console.log(error.message);
		}
	}

	

	//! Input field where user enters information

	return (
    <div className="Background">
      <Navbar></Navbar>
      <Container className="logInFormContainer">
        <h1 className="txtcenter">Welcome Back!</h1>
        <Row>
          <Col lg="4" md="4" xs="2"></Col>
          <Col lg="4" md="4" xs="8">
            <p className="txtcenter">{message}</p>
            <div>
              <Form onSubmit={handleSubmit} className="loginForm">
                <FormGroup floating>
                  <Input
                    id="exampleEmail"
                    name="email"
                    placeholder="Email"
                    type="email"
                    innerRef={emailRef}
                  />
                  <Label for="exampleEmail">Email</Label>
                </FormGroup>{" "}
				
                
				
                  <InputGroup >
				  <FormGroup floating>
				  <Input
                    id="examplePassword"
                    name="password"
                    placeholder="Password"
                    type={state ? "text" : "password"}
                    innerRef={passwordRef}
					
                  />
                  <Label for="examplePassword">Password</Label>
				  </FormGroup>{" "}
				  
				  <Button className="eyebtn input-group-text" onClick={toggleBtn}>
					{ state? <AiOutlineEyeInvisible /> :
						<AiOutlineEye />
					}
				
					</Button>
					
					</InputGroup>
				
                	
					 
	
                <FullWidthButton>
                  <Button type="submit" color="warning">
                    Log In
                  </Button>
                </FullWidthButton>
              </Form>
            </div>
            <Button onClick={() => navigate(`/forgotpassword`)}>
              Forgot Password
            </Button>
          </Col>
          <Col lg="4" md="4" xs="2"></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
