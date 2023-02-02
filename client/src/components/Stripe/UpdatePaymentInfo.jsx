import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Container } from 'react-bootstrap';
import baseURL from '../../utils/baseurl';
import Navbar from "../ProfilePage/ProfileNavBar";
import SetupForm from './SetupForm';

function UpdatePaymentInfo({ token }) {
  const [clientSecret, setClientSecret] = useState(null)
  const [stripePromise, setStripePromise] = useState(null)

  useEffect(() => {
    let url = `${baseURL}/api/config`;
    let myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    const requestOptions = {
      headers: myHeaders,
      method: "GET",
    };
    fetch(url, requestOptions).then(async (result) => {
      const { publishableKey } = await result.json();
      console.log(publishableKey);
      setStripePromise(loadStripe(`${publishableKey}`));
    });
  }, [token]);

  useEffect(() => {
    let url = `${baseURL}/payment_methods/:id`
    let myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    fetch(url, requestOptions)
      .then((result) => result.json())
      .then(async(result) => {
        console.log(result)
      })
  }, [token])



  return (
    <div className="Background">
      <Navbar></Navbar>
      <Container className="signup">
        <h1 className="txtcenter">Update Payment Information</h1>
        {clientSecret && stripePromise && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <SetupForm />
          </Elements>
        )}
      </Container>
    </div>
  )
}

export default UpdatePaymentInfo