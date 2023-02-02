import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "./Checkout";
import baseURL from "../../utils/baseurl";
const stripePromise = loadStripe(
  "pk_test_51MQga9HZaHQFHCjUSOT26iFGIFfVSnMYsYtde7PlTXpmNuhjUOruqYNJ0uIqBnNqQ7QrjvXgmAZcmqiV0uBqP1UD00OafLCg5T"
);

function Payment(token) {
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    let url = `${baseURL}/api/create-payment-intent`;
    let myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    fetch(url, {
      headers: myHeaders,
      method: "POST",
      body: JSON.stringify({}),
    }).then(async (result) => {
      const { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, []);

  console.log(token.id);

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
