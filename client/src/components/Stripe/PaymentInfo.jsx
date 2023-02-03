import { useState, useEffect } from "react";
import { Container } from "reactstrap";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import SetupForm from "./SetupForm";
import jwt_decode from "jwt-decode";
import Navbar from "../Authorization/user/ProfilePage/ProfileNavBar";
import baseURL from "../../utils/baseurl";

function PaymentInfo({ token }) {
	const [clientSecret, setClientSecret] = useState(null);
	const [stripePromise, setStripePromise] = useState(null);

	const decoded = token ? jwt_decode(token) : "";
	useEffect(() => {
		let url = `${baseURL}/api/config`;
		let myHeaders = new Headers();
		myHeaders.append("Authorization", token);
		const requestOptions = {
			headers: myHeaders,
			method: "GET",
		};
		fetch(url, requestOptions).then(async (result) => {
			const { publishableKey } = await result.json();
			console.log(publishableKey);
			setStripePromise(loadStripe(`${publishableKey}`));
		});
	}, [token]);

	useEffect(() => {
		const myHeaders = new Headers();
		myHeaders.append("Authorization", token);
		const bodyObject = {
			customer: decoded.id,
		};
		const requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: bodyObject,
		};
		fetch(`${baseURL}/api/create-setup-intent`, requestOptions)
			.then((result) => result.json())
			.then(async (result) => {
				const setupIntent = result.setupIntent;
				setClientSecret(setupIntent.client_secret);
				// updateToken(result.token)
			})
			.catch((err) => console.log(err.message));
		console.log(decoded);
	}, [token]);

	return (
		<div className="Background">
			<Navbar></Navbar>
			<Container className="signup">
				<h1 className="txtcenter">Set up Payment</h1>
				{clientSecret && stripePromise && (
					<Elements stripe={stripePromise} options={{ clientSecret }}>
						<SetupForm />
					</Elements>
				)}
			</Container>
		</div>
	);
}

export default PaymentInfo;
