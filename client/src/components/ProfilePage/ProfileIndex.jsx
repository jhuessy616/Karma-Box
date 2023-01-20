// ! Dependencies imported
import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";


//! Declaration of Variables
const ProfileIndex = (props) => {
	const [chatrooms, setChatrooms] = useState([]);
	const fetchChatrooms = async () => {
		//! Url our page is hosted on
		const url = `http://localhost:4000/profile`;
		let myHeaders = new Headers();
		myHeaders.append("Authorization", props.token);
		const requestOptions = {
			method: "GET",
			headers: myHeaders,
		};
		try {
			const response = await fetch(url, requestOptions);
			const data = await response.json();
			setChatrooms(data.rooms);
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		if (props.token) {
			fetchChatrooms();
		}
	}, [props.token]);

	//! Container that hosted the create chatroom and display chatroom.
	return (
		<>
			<div className="roomBackground">
				<Container>
					<Row>
						<Col md="4">
							
						</Col>
					</Row>
				</Container>
			</div>
		</>
	);
};

export default ProfileIndex;
