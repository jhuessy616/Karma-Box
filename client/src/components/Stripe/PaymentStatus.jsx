import { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { useStripe } from "@stripe/react-stripe-js";
import ProfileNavbar from "../ProfilePage/ProfileNavBar";
import { Link } from "react-router-dom";
import baseURL from "../../utils/baseurl";

function PaymentStatus({ token, setSessionToken }) {
  const stripe = useStripe();
  const clientSecret = new URLSearchParams(window.location.search).get(
    "setup_intent_client_secret"
  );
  console.log(clientSecret);
  const [message, setMessage] = useState(null);

  function savePayment(setupIntent) {
    let url = `${baseURL}/api/setup_intents/${setupIntent.id}`;
    let headers = new Headers();
    headers.append("Authorization", token);

    const requestOptions = {
      headers: headers,
      method: "GET",
    };
    fetch(url, requestOptions).then(async (result) => {
      const data = await result.json();
      console.log(data);
      console.log("fetched from: ", url);
      attachPayment(setupIntent);
    });
  }

  function attachPayment(setupIntent) {
    console.log(setupIntent);
    let url = `${baseURL}/api/payment_methods/attach`;
    let headers = new Headers();
    headers.append("Authorization", token);

    const requestOptions = {
      headers: headers,
      method: "POST",
    };
    fetch(url, requestOptions).then(async (result) => {
      const data = await result.json();
      console.log(data);
      console.log("fetched from: ", url);
    });
  }

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "setup_intent_client_secret"
    );

    stripe.retrieveSetupIntent(clientSecret).then(({ setupIntent }) => {
      console.log(setupIntent);
      // eslint-disable-next-line default-case
      switch (setupIntent.status) {
        case "succeeded":
          setMessage("Success! Your payment method has been saved.");
          savePayment(setupIntent);
          break;
        case "processing":
          setMessage(
            "Processing payment details. We'll update you when processing is complete."
          );
          break;
        case "requires_payment_method":
          setMessage(
            "Failed to process payment details. Please try another payment method."
          );
          break;
      }
      console.log(setupIntent);
    });
  }, [stripe]);

  return (
    <div className="Background">
      <ProfileNavbar
        token={token}
        setSessionToken={setSessionToken}
      ></ProfileNavbar>
      <h1
        className="txtcenter"
        style={{ paddingTop: "25vh", justifySelf: "center" }}
      >
        {message}
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Link to="/profile">
          <Button type="submit" color="warning">
            Begin Earning Good Karma!
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default PaymentStatus;
