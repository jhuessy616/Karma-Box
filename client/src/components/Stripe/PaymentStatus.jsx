import { useState, useEffect } from "react";
import { Button } from "reactstrap"
import { useSearchParams } from 'react-router-dom';
import { useStripe } from "@stripe/react-stripe-js";
import Navbar from "../ProfilePage/ProfileNavBar"
import { Link } from "react-router-dom"


function PaymentStatus({ token }) {

  const stripe = useStripe();
  const [message, setMessage] = useState(null);
  const [searchParams] = useSearchParams();
    
    function savePayment(setupIntent) {
        let url = `http://localhost:4000/api/setup_intents/${setupIntent.id}`;
        let headers = new Headers();
        headers.append("Authorization", token);

        const requestOptions = {
            headers: headers,
            method: "GET"
        };
        fetch(url, requestOptions).then(async(result) => {
            const data = await result.json()
            console.log(data)
            console.log('fetched from: ', url)
            attachPayment(setupIntent);
        });


    }


    function attachPayment(setupIntent) {
        console.log(setupIntent)
        let url = `http://localhost:4000/api/payment_methods/attach`;
        let headers = new Headers();
        headers.append("Authorization", token);

        const requestOptions = {
            headers: headers,
            method: "POST"
        };
        fetch(url, requestOptions).then(async(result) => {
            const data = await result.json()
            console.log(data)
            console.log('fetched from: ', url)
        });
    }


  useEffect(() => {
    if(!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'setup_intent_client_secret'
    );
    console.log(stripe, clientSecret)
    stripe.retrieveSetupIntent(clientSecret)
    .then(({setupIntent}) => {
      console.log(setupIntent)
      // eslint-disable-next-line default-case
      switch(setupIntent.status) {
        case 'succeeded':
          setMessage('Success! your payment method has been saved.');
          savePayment(setupIntent);
          break;
        case 'processing':
          setMessage("Processing payment details. We'll update you when processing is complete.");
          break;
        case 'requires_payment_method':
          setMessage('Failed to process payment details. Please try another payment method.');
          break;
      }
      console.log(setupIntent)
    })
    
  }, [stripe]);
  
  return(
    <div className="Background">
      <Navbar></Navbar>
    <h1 className="txtcenter" style={{ paddingTop: "25vh",justifySelf: "center"}} >{message}</h1>
    <div style={{
      display: "flex", justifyContent:"center"}}>
      <Link to="/profile">
     <Button type="submit" color="warning"
     >
      Begin Earning Good Karma!
    </Button>
    </Link>
    </div>
                
    </div>
    )
  }
  
  export default PaymentStatus;
  
  // console.log('token: ', token)
  
  // const searchParamsObj = Object.fromEntries([...searchParams])
  // const clientSecret = searchParamsObj.setup_intent_client_secret
  // const setiId = searchParamsObj.setup_intent
  // const status = searchParamsObj.redirect_status
  // console.log(clientSecret)
  // let url = (
  //   `http://localhost:4000/api/setup_intents/:id` + new URLSearchParams(window.location.search).get('setup_intent_client_secret')
  // )

  // let myHeaders = new Headers();
  // myHeaders.append("Authorization", token)
  
  // const requestOptions = {
  //   headers: myHeaders,
  //   method: "GET"
  // }
  // fetch(url, requestOptions).then(async(result) => {
  //   const data = await result.json()
  //   console.log(data)
  //   console.log('fetched from: ', url)
  // })
// if (!stripe) {
//   const clientSecret = new URLSearchParams(window.location.search).get(
//     "setup_intent_client_secret"
//   );
//   let url = `http://localhost:4000/api/setup_intents/${clientSecret}/confirm`;
//   let myHeaders = new Headers();
//   myHeaders.append("Authorization", token)
//   const requestOptions = {
//     headers: myHeaders,
//     method: "POST"
//   }
//   fetch(url, requestOptions).then(async(result) => {
//     const data = await result.json();
//     console.log(data)
//   })
//   stripe.setupIntents.confirm(clientSecret).then(({ setupIntent }) => {
//     switch (setupIntent.status) {
//       case "succeeded":
//         setMessage("Success your payment method has been saved");
//         break;
//       case "processing":
//         setMessage(
//           "Processing payment details. We'll update you when processing is complete"
//         );
//         break;
//       case "requires_payment_method":
//         setMessage("Failed to process payment");
//         break;
//       default:
//         setMessage("Please provide payment information");
//     }
//   });
//   console.log(clientSecret)
// }
