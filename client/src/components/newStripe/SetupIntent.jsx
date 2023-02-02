import {useState, useEffect} from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js"
import SetupForm from "../Stripe/SetupForm";
import jwt_decode from "jwt-decode";


export default function SetupIntent(props) {
    return (
        <>
            <Elements stripe={stripePromise} options={{clientSecret}}>
                <SetupForm />
            </Elements>
        </>
    );
}

