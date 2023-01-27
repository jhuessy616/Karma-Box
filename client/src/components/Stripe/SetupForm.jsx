import { useState } from "react";
// import { useSearchParams } from 'react-router-dom'
import { PaymentElement } from "@stripe/react-stripe-js";
import { useStripe } from "@stripe/react-stripe-js";
import { useElements } from "@stripe/react-stripe-js";
import "./setupform.css";


function SetupForm() {
  const stripe = useStripe();
  const elements = useElements();
  // const [searchParams] = useSearchParams()

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);

    // const searchParamsObj = Object.fromEntries([...searchParams])
    // const clientSecret = searchParamsObj.setup_intent_client_secret
    // const stringClientSecret = clientSecret.toString()
    // console.log(clientSecret)
    // const setiId = searchParamsObj.setup_intent
    
    // const { error } = await stripe.confirmCardSetup({
    //   'clientSecret',
    //   confirmParams: {
    //     return_url: `${window.location.origin}/`
    //   }
    // })

    const { error } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/paymentStatus`,
      },
    });
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }
    setIsProcessing(false);
  };


  return (
    <div id="payment-body">
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" />
        <button disabled={isProcessing || !stripe || !elements} id="submit">
          <span id="button-text">
            {isProcessing ? "Processing... " : "Pay now"}
          </span>
        </button>
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  );

}

export default SetupForm;
