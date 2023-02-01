import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import SetupForm from "./SetupForm";
import jwt_decode from "jwt-decode";
import Navbar from "../ProfilePage/ProfileNavBar";
import { Container } from "reactstrap";
import baseURL from "../../utils/baseurl";

const stripePromise = loadStripe(
  "pk_test_51MPto2DlyQc1W9SgotQU0GrS8j4UIkzyNQSW9p2XiCiGm1fybuxJGWdGNtfw8wgMDiXlTThmcTwgVoclY3JjGgLB00XEumSXYl"
);

let count = 0;

function SetupIntent({ token }) {
  const [clientSecret, setClientSecret] = useState(null);
  const decoded = token ? jwt_decode(token) : "";

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
      <Navbar></Navbar>
      <Container className="signup">


      <h1 className="txtcenter">Begin Earning Good Karma Today!</h1>
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
