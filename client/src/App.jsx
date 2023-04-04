import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentInfo from "./components/Stripe/PaymentInfo";
import Login from "./components/Authorization/Login-Signup/login/Login";
import SignUpPage from "./components/Authorization/Login-Signup/signup/SignUpPage";
import NonProfitSignUpPage from "./components/Authorization/Login-Signup/signup/NonProfitSignUp";
import ProfileIndex from "./components/ProfilePage/ProfileIndex";
import Home from "./components/home/Home";

import ForgotPassword from "./components/Authorization/Login-Signup/login/ForgotPassword";
import ResetPassword from "./components/Authorization/Login-Signup/login/ForgotResetPassword";

import PaymentStatus from "./components/Stripe/PaymentStatus";
import UpdatePassword from "./components/Authorization/Update/UpdatePassword";
import EmailUpdate from "./components/Authorization/Update/EmailUpdate";
import PaymentRedirect from "./components/PaymentRedirect/paymentRedirect";
import AdminProfile from "./components/Admin/AdminProfile";

import "./app.css";

import SetupIntent from "./components/Stripe/SetupIntent";

import Payment from "./components/Stripe/Payment";

import AfterPayment from "./components/PaymentRedirect/AfterPayment.jsx";

import Docs from "./components/Docs/Docs";

import AboutPage from "./components/aboutPage/aboutPage";

import UpdatePaymentInfo from "./components/Stripe/UpdatePaymentInfo";
import AdminUsersIndex from "./components/Admin/AdminUsersIndex";

const stripePromise = loadStripe(
  "pk_test_51MQga9HZaHQFHCjUSOT26iFGIFfVSnMYsYtde7PlTXpmNuhjUOruqYNJ0uIqBnNqQ7QrjvXgmAZcmqiV0uBqP1UD00OafLCg5T"
);

function App() {
  const [sessionToken, setSessionToken] = useState("");
  const [returnUrl, setReturnUrl] = useState("");

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
          <Route path="/" element={<Home token={sessionToken} />} />
          <Route path="/login" element={<Login updateToken={updateToken} />} />
          <Route
            path="/signup"
            element={<SignUpPage updateToken={updateToken} />}
          />
          <Route path="/nonprofitsignup" element={<NonProfitSignUpPage />} />
          <Route
            path="/profile"
            element={
              <ProfileIndex
                token={sessionToken}
                setSessionToken={setSessionToken}
              />
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/admin"
            element={<AdminProfile token={sessionToken} />}
          />
          <Route
            path="/admin/users"
            element={<AdminUsersIndex token={sessionToken} />}
          />
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
          <Route path="/payment" element={<Payment returnUrl={returnUrl} />} />
          <Route
            path="/updatePayment"
            element={
              <UpdatePaymentInfo
                updateToken={updateToken}
                token={sessionToken}
              />
            }
          />
          <Route path="/payment" element={<Payment token={sessionToken} />} />
          <Route path="docs" element={<Docs />} />

          <Route
            path="/paymentStatus"
            element={
              <PaymentStatus
                token={sessionToken}
                setSessionToken={setSessionToken}
              />
            }
          />
          <Route path="/paymentinfo" element={<PaymentInfo />} />
          <Route
            path="/updatePassword"
            element={
              <UpdatePassword
                token={sessionToken}
                setSessionToken={setSessionToken}
              />
            }
          />
          <Route
            path="email"
            element={
              <EmailUpdate
                token={sessionToken}
                setSessionToken={setSessionToken}
              />
            }
          />
          <Route
            path="/paymentRedirect"
            element={
              <PaymentRedirect
                setReturnUrl={setReturnUrl}
                token={sessionToken}
              />
            }
          />
          <Route
            path="/afterpayment"
            element={<AfterPayment token={sessionToken} />}
          />
        </Routes>
      </Elements>
    </div>
  );
}

export default App;
