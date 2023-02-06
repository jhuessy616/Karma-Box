import LogedIN from "./LogedIn";
import NotLogedIn from "./NotLogedIn.jsx";

import { Button } from "reactstrap";
import Navbar from "../../../home/NavBar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../../../assets/img/logo3.png"
import "./paymentredirect.css"
function PaymentRedirect({token, setReturnUrl}){
    const params = useLocation().search;
    const [logedIn, setLogedIn] = useState(token.length > 0);

    useEffect(() => {
        setLogedIn(token.length > 0);
    }, [token]);

    let returnUrl = new URLSearchParams(params).get("f");
    setReturnUrl(returnUrl);
    let amount = new URLSearchParams(params).get("a");

return (
  <div className="Background">
    {/* <Navbar /> */}
    <div className="logobox">
      <img className="logo" style={{
        maxWidth: 150
      }} src={ logo } alt="Logo" />
    </div>
    <div className="loggedinorno"> 
    {logedIn ? <LogedIN amount={amount} return={returnUrl} /> : <NotLogedIn />}
  </div>
  </div>
);
}

export default PaymentRedirect;
