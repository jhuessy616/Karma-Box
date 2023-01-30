import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// !below are the routes I am importing to the sign in and log in pages
import Login from "./components/Authorization/user/login/Login";
import SignUpPage from "./components/Authorization/user/SignUpPage";
import ProfileIndex from "./components/ProfilePage/ProfileIndex";
import Home from "./components/home/Home";
import About from "./components/home/About";
import PaymentStatus from "./components/Stripe/PaymentStatus";

import "./app.css";

import SetupIntent from "./components/Stripe/SetupIntent";

import Payment from "./components/Stripe/Payment";

import Docs from "./components/Docs/Docs";

import AboutPage from "./components/Authorization/user/aboutPage/aboutPage";

function App() {
  const [sessionToken, setSessionToken] = useState("");

  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
    }
  }, []);

  const stripePromise = loadStripe(
    "pk_test_51MQga9HZaHQFHCjUSOT26iFGIFfVSnMYsYtde7PlTXpmNuhjUOruqYNJ0uIqBnNqQ7QrjvXgmAZcmqiV0uBqP1UD00OafLCg5T"
  );

  //! Declaration of Routes
  return (
    <div>
      <Elements stripe={stripePromise}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login updateToken={updateToken} />} />
          <Route
            path="/signup"
            element={<SignUpPage updateToken={updateToken} />}
          />
          <Route
            path="/profile"
            element={<ProfileIndex token={sessionToken} />}
          />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/setupIntent"
            element={
              <SetupIntent updateToken={updateToken} token={sessionToken} />
            }
          />
          <Route path="/payment" element={<Payment token={sessionToken} />} />
          <Route path="docs" element={<Docs />} />
          <Route path="/paymentStatus" element={<PaymentStatus token={sessionToken} />} />
        </Routes>
      </Elements>
    </div>
  );
}

export default App;
