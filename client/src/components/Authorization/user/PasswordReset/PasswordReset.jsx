// ! Dependencies imported
import React, { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import {
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
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import FullWidthButton from "../../Buttons/FullWidthButton";
import Navbar from "../ProfilePage/ProfileNavBar";

//! Declaration of Vairables
const PasswordReset = (props) => {
	const currentPasswordRef = useRef();
	const newPasswordRef = useRef();
	const navigate = useNavigate();
	const decoded = props.token ? jwt_decode(props.token) : "";

	const [state, setState] = useState(false);
	const toggleBtn = (e) => {
		e.preventDefault();
		setState((prevState) => !prevState);
	};

	async function handleSubmit(e) {
		e.preventDefault();
		const currentPassword = currentPasswordRef.current.value;
		const newPassword = newPasswordRef.current.value;

		//!Url our page is hosed on
		let url = `http://localhost:4000/user/update/${decoded.id}`;
		let bodyObject = JSON.stringify({ currentPassword, newPassword });

		let myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", props.token);

		const requestOptions = {
			headers: myHeaders,
			body: bodyObject,
			method: "PATCH",
		};
		//! function that runs when the user hits the signup button, that then allows them to log in
		try {
			const response = await fetch(url, requestOptions);
			const data = await response.json();
			console.log(data);
			if (data.message === "Success") {
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
		<div className="Background">
			<Navbar></Navbar>
			<Container className="logInForm">
				<Row>
					<div class="col-2 col-md-4 col-lg-4.5"></div>

					<div class="col-8 col-md-4 col-lg-3">
						<h1>Update Your Password.</h1>
						<Form onSubmit={handleSubmit}>
							<InputGroup>
								<FormGroup floating>
									<Input
										id="currentPassword"
										name="currentPassword"
										placeholder="currentPassword"
										type={state ? "text" : "password"}
										innerRef={currentPasswordRef}
									/>
									<Label for="examplePassword">Current Password</Label>
								</FormGroup>{" "}
								<Button className="eyebtn input-group-text" onClick={toggleBtn}>
									{state ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
								</Button>
							</InputGroup>
							<InputGroup>
								<FormGroup floating>
									<Input
										id="newPassword"
										name="newPassword"
										placeholder="newPassword"
										type={state ? "text" : "password"}
										innerRef={newPasswordRef}
									/>
									<Label for="currentPassword">New Password</Label>
								</FormGroup>{" "}
								<Button className="eyebtn input-group-text" onClick={toggleBtn}>
									{state ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
								</Button>
							</InputGroup>
							<InputGroup>
								<FormGroup floating>
									<Input
										id="newPassword"
										name="newPassword"
										placeholder="newPassword"
										type={state ? "text" : "password"}
									/>
									<Label for="newPassword">Confirm New Password</Label>
								</FormGroup>{" "}
								<Button className="eyebtn input-group-text" onClick={toggleBtn}>
									{state ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
								</Button>
							</InputGroup>
							<FullWidthButton>
								<Button type="submit" color="warning">
									Update Password
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

export default PasswordReset;
