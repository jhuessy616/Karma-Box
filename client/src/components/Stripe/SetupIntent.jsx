import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import SetupForm from "./SetupForm";
import jwt_decode from "jwt-decode";
import ProfileNavbar from "../ProfilePage/ProfileNavBar";
import { Container } from "reactstrap";
import baseURL from "../../utils/baseurl";

const stripePromise = loadStripe(
  'pk_test_51MPto2DlyQc1W9SgotQU0GrS8j4UIkzyNQSW9p2XiCiGm1fybuxJGWdGNtfw8wgMDiXlTThmcTwgVoclY3JjGgLB00XEumSXYl'
);

let count = 0;

function SetupIntent({ token }) {
  const [clientSecret, setClientSecret] = useState(null);
  const [stripePromise, setStripePromise] = useState(null)
  const decoded = token ? jwt_decode(token) : "";


// If we have a token we make a fetch request to our create-setup-endpoint again sending our token in the headers.
// Our response is the setupIntent Object which has a client_secret that we need to complete the transaction. 
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
    if (token && count === 0) {
      console.log(token);
      count = 1;
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

        })
        .catch((err) => console.log(err.message));
      console.log("decoded: ", decoded);
    }

  }, [token]);

  return (
    <div className="Background">
      {/* <ProfileNavbar></ProfileNavbar> */}
      <Container className="signup">


      <h1 className="txtcenter" style={{paddingTop:50}}>Begin Earning Good Karma Today!</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <SetupForm />
        </Elements>
      )}

      </Container>
    </div>
  );
}

export default SetupIntent;
