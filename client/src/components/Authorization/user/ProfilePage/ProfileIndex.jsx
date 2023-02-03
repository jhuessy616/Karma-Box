// ! Dependencies imported
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
	Button,
	Form,
	FormGroup,
	Input,
	Label,
	Col,
	Container,
	Row,
	Table,
	Card,
	CardHeader,
	CardBody,
	CardTitle,
	CardText,
} from "reactstrap";
import FullWidthButton from "../../Buttons/FullWidthButton";
import ProfileNavbar from "./ProfileNavBar";
import "./ProfileIndex.css";

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
		<div className="Background">
			<ProfileNavbar></ProfileNavbar>
			<Container>
				<h1 className="txtcenter">Welcome to Your Karma Box Dashboard!</h1>
				<h2 className="txtcenter">Below are your Karma Box donations.</h2>

				<Row>
					<Col lg="4.5" md="4" xs="2"></Col>
					<Col lg="4.5" md="4" xs="2">
						<Table>
							<tbody>
								<tr className="table-info">
									<td>
										<h2>Charity:</h2>
									</td>
									<td>
										<h2>Amount:</h2>
									</td>
								</tr>
								<tr className="table-info">
									<td>Habitat for Humanity</td>
									<td>$1,000</td>
								</tr>
								<tr className="table-info">
									<td>Boys and Girls Club</td>
									<td>$1,000</td>
								</tr>
								<tr className="table-info">
									<td>Habitat for Humanity</td>
									<td>$1,000</td>
								</tr>
								<tr className="table-info">
									<td>Cancer Research Institute</td>
									<td>$1,000</td>
								</tr>
								<tr className="table-info">
									<td>Hope for the Warriors</td>
									<td>$1,000</td>
								</tr>
								<tr className="table-info">
									<td>The Alzheimer's Association</td>
									<td>$1,000</td>
								</tr>
							</tbody>
						</Table>
					</Col>

					<Col lg="4.5" md="4" xs="2">
						{" "}
						<Card
							className="my-2"
							color="info"
							inverse
							style={{
								width: "18rem",
							}}
						>
							<CardHeader>Total Amount Donated:</CardHeader>
							<CardBody>
								<CardTitle tag="h5">$6,000</CardTitle>

							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default ProfileIndex;
