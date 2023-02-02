import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentInfo from "./components/Stripe/PaymentInfo"
import Login from "./components/Authorization/user/login/Login";
import SignUpPage from "./components/Authorization/user/SignUpPage";
import NonProfitSignUpPage from "./components/Authorization/user/signup/NonProfitSignUp";
import ProfileIndex from "./components/ProfilePage/ProfileIndex";
import Home from "./components/home/Home";
import About from "./components/home/About";

import ForgotPassword from "./components/Authorization/user/login/ForgotPassword"
import ResetPassword from "./components/Authorization/user/login/ForgotResetPassword";

import PaymentStatus from "./components/Stripe/PaymentStatus";
import PasswordReset from "./components/Authorization/user/PasswordReset/PasswordReset"
import EmailUpdate from "./components/Authorization/user/EmailUpdate/EmailUpdate";


import "./app.css";
import SetupIntent from "./components/Stripe/SetupIntent";
import Payment from "./components/Stripe/Payment";

import Docs from "./components/Docs/Docs";

import AboutPage from "./components/Authorization/user/aboutPage/aboutPage";
const stripePromise = loadStripe(
  "pk_test_51MQga9HZaHQFHCjUSOT26iFGIFfVSnMYsYtde7PlTXpmNuhjUOruqYNJ0uIqBnNqQ7QrjvXgmAZcmqiV0uBqP1UD00OafLCg5T"
);

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
            path="/nonprofitsignup"
            element={<NonProfitSignUpPage/>}
          />
          <Route
            path="/profile"
            element={<ProfileIndex token={sessionToken} />}
          />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/forgotpassword"
            element={<ForgotPassword token={sessionToken} />}
          />
          <Route
            path="/resetpassword/:id/:token"
            element={<ResetPassword token={sessionToken} />}
          />
          <Route
            path="/setupIntent"
            element={
              <SetupIntent updateToken={updateToken} token={sessionToken} />
            }
          />
          <Route path="/payment" element={<Payment token={sessionToken} />} />
          <Route path="docs" element={<Docs />} />

          <Route path="/paymentStatus" element={<PaymentStatus token={sessionToken} />} />
          <Route path="/paymentinfo" element={<PaymentInfo/>} />
          <Route path="/updatePassword" element={<PasswordReset token= {sessionToken}/>} />
          <Route path="email" element={<EmailUpdate token= {sessionToken}/>} />

        </Routes>
      </Elements>
    </div>
  );

}

export default App;
