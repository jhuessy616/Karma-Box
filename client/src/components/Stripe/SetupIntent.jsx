import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import SetupForm from "./SetupForm";
import jwt_decode from 'jwt-decode'

// ! SetupIntent Component
// Renders the Checkout component
// Redirects home upon successful submission

let stripePromise = loadStripe("pk_test_51MQga9HZaHQFHCjUSOT26iFGIFfVSnMYsYtde7PlTXpmNuhjUOruqYNJ0uIqBnNqQ7QrjvXgmAZcmqiV0uBqP1UD00OafLCg5T");
let count = 0;

function SetupIntent({ token, updateToken }) {
    console.log("token", token)
  //const [customerId, setCustomerId] = useState("");
  //const [setupIntent, setSetupIntent] = useState(null);
  const [clientSecret, setClientSecret] = useState(null)
  // const [stripePromise, setStripePromise] = useState(null)
  //let baseURL = "http://localhost/4000/";
  // let url = `http://localhost:4000/payment`;
  //const decoded = token ? jwt_decode(token) : "";
    

// Fetch Stripe PublishableKey and store it as stripe promise.
// The publishable key is a promise so it must be handled asynchronously.
// Token is sent in headers to validate that a user is logged in. 
const decoded = token ? jwt_decode(token) : "";
  useEffect(() => {
    if (token) {
    console.log("token",token)
    // if (decoded.customerId === "") {
      let url = "http://localhost:4000/api/config";
      let myHeaders = new Headers();
      myHeaders.append("Authorization", token)
      const requestOptions = {
        headers: myHeaders,
        method: "GET",
      }
      fetch(url, requestOptions).then(async (result) => {
        const { publishableKey } = await result.json();
        console.log(publishableKey)
        // setStripePromise(loadStripe(`${publishableKey}`));
      });
    // } else {
    //   alert('sorry there is already an account associated with this user')
    // }
    }
  }, [token]);

// If we have a token we make a fetch request to our create-setup-endpoint again sending our token in the headers.
// Our response is the setupIntent Object which has a client_secret that we need to complete the transaction. 
  useEffect(() => {
    if (token && count == 0){
      console.log(token)
      count = 1;
      const myHeaders = new Headers();
      myHeaders.append("Authorization", token); 
      // console.log("decoded", decoded)
      // const bodyObject = {
      //   customer: decoded.id
      // }
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        // body: bodyObject
      };
      fetch("http://localhost:4000/api/create-setup-intent", requestOptions)
        .then((result) => result.json())
        .then(async (result) => {
          const setupIntent = result.setupIntent
          setClientSecret(setupIntent.client_secret);
            // console.log("setupIntent", setupIntent)
          // updateToken(result.token)
        }).catch((err) => console.log(err.message));
    console.log("decoded", decoded);
      }
  }, [token]);

 
// In our return we check that we have both the stripePromise(publishableKey) and the clientSecret.
// If so we render the stripe elements on the page. 

  return (
    <div>
      <h1>Set up Payment</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <SetupForm />
        </Elements>
      )}
    </div>
  );
}

export default SetupIntent;
