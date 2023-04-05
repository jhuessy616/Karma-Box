import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "./Checkout";
import baseURL from "../../utils/baseurl";

const stripePromise = loadStripe(
  "pk_test_51MQga9HZaHQFHCjUSOT26iFGIFfVSnMYsYtde7PlTXpmNuhjUOruqYNJ0uIqBnNqQ7QrjvXgmAZcmqiV0uBqP1UD00OafLCg5T"
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
   
    <div className="Background txtcenter login">
     
        <h1 style={{paddingTop:50}}>Payment</h1>
        {clientSecret && stripePromise && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <Checkout returnUrl={returnUrl} />
          </Elements>
        )}
    
    </div>
  );
}

export default Payment;
