import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "./Checkout";
import baseURL from "../../utils/baseurl";
const stripePromise = loadStripe(
  "'pk_test_51MPto2DlyQc1W9SgotQU0GrS8j4UIkzyNQSW9p2XiCiGm1fybuxJGWdGNtfw8wgMDiXlTThmcTwgVoclY3JjGgLB00XEumSXYl'"
);

function Payment({returnUrl}) {
    const [clientSecret, setClientSecret] = useState(null);

    useEffect(() => {
        let url = `${baseURL}/api/create-payment-intent-guest`;
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        fetch(url, {
            headers: myHeaders,
            method: "POST",
            body: JSON.stringify({
                amount: 100,
            }),
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
          <Checkout returnUrl={returnUrl}/>
        </Elements>
      )}
    </div>
  );
}

export default Payment;
