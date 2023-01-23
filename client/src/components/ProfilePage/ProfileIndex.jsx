// ! Dependencies imported
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom"
import { Button, Form, FormGroup, Input, Label, Col, Container, Row } from "reactstrap";
import FullWidthButton from "../../../src/components/Authorization/Buttons/FullWidthButton";
import Navbar from "../home/NavBar"
import "./ProfileIndex.css"

//! Declaration of Vairables
const ProfileIndex = (props) => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const confirmPasswordRef = useRef();
	const navigate = useNavigate();
  
	async function handleSubmit(e) {
	  e.preventDefault();
  const email = emailRef.current.value;
	  const password = passwordRef.current.value;
	  
	  //!Url our page is hosed on
	  let url = `http://localhost:4000/user/profile`;
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

	//! Container that hosted the create chatroom and display chatroom.
	return (
		<div className="Background">
			<Navbar></Navbar>
			<Container className="logInForm">
						<h1>Update Your Profile Information</h1>
						<div>
							<Form onSubmit={handleSubmit}>
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
								<FormGroup floating>
									<Input
										id="examplePassword"
										name="password"
										placeholder="Password"
										type="password"
										innerRef={passwordRef}
									/>
									<Label for="examplePassword">Password</Label>
								</FormGroup>{" "}
								<FullWidthButton>
									<Button type="submit" color="warning">
										Update Information
									</Button>
								</FullWidthButton>
							</Form>
						</div>
				
			</Container>
		</div>
	);
};

export default ProfileIndex;
