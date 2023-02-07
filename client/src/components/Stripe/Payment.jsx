import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "./Checkout";
import baseURL from "../../utils/baseurl";
const stripePromise = loadStripe(
  "'pk_test_51MPto2DlyQc1W9SgotQU0GrS8j4UIkzyNQSW9p2XiCiGm1fybuxJGWdGNtfw8wgMDiXlTThmcTwgVoclY3JjGgLB00XEumSXYl'"
);

function Payment({token}) {
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    let amount = 1
    let url = `${baseURL}/api/create-payment-intent`;
    let myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    fetch(url, {
      headers: myHeaders,
      method: "POST",
      body: JSON.stringify({amount: amount}),
    }).then(async (result) => {
      const { clientSecret } = await result.json();
      console.log('clientSecret: ', clientSecret)
      setClientSecret(clientSecret);
    });
  }, [token]);

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
