// ! Dependencies imported
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom"
import { Button, Form, FormGroup, Input, Label, Col, Container, Row } from "reactstrap";
import FullWidthButton from "../../../src/components/Authorization/Buttons/FullWidthButton";
import Navbar from "./ProfileNavBar"
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
	  let url = `http://localhost:4000/user/password`;
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
				<Row>
				<div class="col-2 col-md-4 col-lg-4.5"></div>
					
					<div class="col-8 col-md-4 col-lg-3">
						<h1>Update Your Profile Information</h1>
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
					
					<Col lg="4.5" md="4" xs="2"></Col>
				</Row>
			</Container>
		</div>
	);
};

export default ProfileIndex;
