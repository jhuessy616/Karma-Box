import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
// import { BrowserRouter } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// let baseURL = "http://localhost/4000/";
// (async () => {
//   const { publishableKey } = await fetch(`${baseURL}api/config`).then(
//     (result) => result.json()
//     );
//     console.log(publishableKey)
//   const stripePromise = loadStripe(publishableKey);

//  const stripePromise = loadStripe(
//    "pk_test_51MPto2DlyQc1W9SgotQU0GrS8j4UIkzyNQSW9p2XiCiGm1fybuxJGWdGNtfw8wgMDiXlTThmcTwgVoclY3JjGgLB00XEumSXYl"
//  );
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      {/* <Elements stripe={stripePromise}>
        <BrowserRouter> */}
          <App />
        {/* </BrowserRouter>  */}
       {/* </Elements> */}
    </React.StrictMode>
  );


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
