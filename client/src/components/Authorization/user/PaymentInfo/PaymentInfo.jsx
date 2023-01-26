// ! Dependencies imported
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom"
import { Button, Form, FormGroup, Input, Label, Col, Container, Row } from "reactstrap";
import FullWidthButton from "../../../src/components/Authorization/Buttons/FullWidthButton";
import PaymentInfoNavbar from "../PaymentInfo/PaymentInfoNavBar"
import "./ProfileIndex.css"

//! Declaration of Vairables
const PaymentInfo = (props) => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const confirmPasswordRef = useRef();
	const navigate = useNavigate();
  
	async function handleSubmit(e) {
	  e.preventDefault();
  const email = emailRef.current.value;
	  const password = passwordRef.current.value;
	  
	  //!Url our page is hosed on
	  let url = `http://localhost:4000/user/paymentinfo`;
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
		  <PaymentInfoNavbar></PaymentInfoNavbar>
		  <Container>
		  <h1 className="txtcenter">Welcome back to Karma Box!</h1>
			<h2 className="txtcenter" >Below are your Karma Box donations</h2>
		  <Row>
						<Col lg="4.5" md="4" xs="2"></Col>
		  
			  <Col lg="3" md="4" xs="8">
				</Col>
			  
			  <Col lg="4.5" md="4" xs="2"></Col>
			</Row>
		  </Container>
		</div>
	  );
	};

export default PaymentInfo;
