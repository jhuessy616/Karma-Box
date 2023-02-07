import {Button} from "reactstrap";
import { useNavigate } from "react-router-dom";
import "./paymentredirect.css"
export default function NotLogedIn() {
    const navigate = useNavigate();
    return (
      <>
        <h1 className="txtcenter">
          It looks like you don't have a Karma Box account
        </h1>
        <h1 className="txtcenter">
          or are not <a href="/login">logged in</a>
            </h1>
            <div className="buttons-redirect" style={{marginTop:15}}>
        <Button color="warning" onClick={() => navigate("/signup")}>
          Sign Up Today
                </Button>
                </div>
        <h2 className="txtcenter">or</h2>
              <div className="buttons-redirect">
        <Button color="warning" onClick={() => navigate("/payment")}>
          Continue As A Guest
            </Button>
            </div>
      </>
    );
}

