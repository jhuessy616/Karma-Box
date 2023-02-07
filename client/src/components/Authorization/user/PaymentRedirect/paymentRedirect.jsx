import LogedIN from "./LogedIn";
import NotLogedIn from "./NotLogedIn.jsx";

import { Button } from "reactstrap";
import Navbar from "../../../home/NavBar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../../../assets/img/logo3.png"
import "./paymentredirect.css"
import baseURL from "../../../../utils/baseurl.js"
function PaymentRedirect({token, setReturnUrl}){
    const params = useLocation().search;
    const [logedIn, setLogedIn] = useState("loading");

    let returnUrl = new URLSearchParams(params).get("f");
    let amount = new URLSearchParams(params).get("a");


    async function do_payment() {
        let url = `${baseURL}/api/create-payment-intent`
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", token);
        let body = JSON.stringify({
            amount: amount,
            organization: "Mermaids Against Plastic" // change to url coming from widget when thats not going to be localhost
        });

        const res = await fetch(url, {
            method: "POST",
            headers,
            body
        });
        setLogedIn(`${token.length > 0}`);
    }

    useEffect(() => {
        setReturnUrl(returnUrl);
        if (localStorage.getItem("token")) {
            do_payment();
        }else {
            setLogedIn(`${token.length > 0}`);
        }
    }, [token]);


return (
  <div className="Background">
    <div className="logobox">
      <img className="logo" style={{
        maxWidth: 150
      }} src={ logo } alt="Logo" />
    </div>
    <div className="loggedinorno"> 
    {logedIn == "loading" ? (<h1>Loading</h1>) : logedIn == "true" ? <LogedIN amount={amount} return={returnUrl} /> : <NotLogedIn />}
  </div>
  </div>
);
}

export default PaymentRedirect;
