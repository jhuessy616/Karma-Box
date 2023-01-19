import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "./Checkout";

function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);

  let baseURL = "http://localhost:4000/";

  useEffect(() => {
    let url = `${baseURL}api/config`;
    fetch(url).then(async (result) => {
      const { publishableKey } = await result.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    let url = `${baseURL}api/create-payment-intent`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify({}),
    }).then(async (result) => {
      const { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, []);

  return (
    <div>
      <h1>Payment</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <Checkout />
        </Elements>
      )}
    </div>
  );
}

export default Payment;
