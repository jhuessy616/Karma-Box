import LogedIN from "./LogedIn";
import NotLogedIn from "./NotLogedIn.jsx";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import logo from "../../assets/img/logo3.png";
import "./paymentredirect.css";
import baseURL from "../../utils/baseurl.js";

let payed = false;

function PaymentRedirect({ token, setReturnUrl }) {
  const params = useLocation().search;
  const [logedIn, setLogedIn] = useState("loading");

  let returnUrl = new URLSearchParams(params).get("f");
  let amount = new URLSearchParams(params).get("a");

  async function do_payment() {
    if (payed) {
      return;
    }
    payed = true;
    let url = `${baseURL}/api/create-payment-intent`;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", localStorage.getItem("token"));
    let body = JSON.stringify({
      amount: amount,
      organization: "Mermaids Against Plastic", // change to url coming from widget when thats not going to be localhost
    });
    console.log("test");
    //   const res =
          await fetch(url, {
      method: "POST",
      headers,
      body,
    }).then(async (res) => {
      let t = await res.json();
      console.log("set login", t);
      setLogedIn(`true`);
    });
  }

  useEffect(() => {
    setReturnUrl(returnUrl);
    if (localStorage.getItem("token")) {
      do_payment();
    } else {
      setLogedIn(`loading`);
    }
  }, [token]);

  return (
    <div className="Background">
      <div className="logobox">
        <img
          className="logo"
          style={{
            maxWidth: 150,
          }}
          src={logo}
          alt="Logo"
        />
      </div>
      <div className="loggedinorno">
        {logedIn === "loading" ? (
          <h1 className="txtcenter" style={{ marginTop: "200px" }}>
            Loading...
          </h1>
        ) : logedIn === "true" ? (
          <LogedIN amount={amount} return={returnUrl} />
        ) : (
          <NotLogedIn />
        )}
      </div>
    </div>
  );
}

export default PaymentRedirect;
