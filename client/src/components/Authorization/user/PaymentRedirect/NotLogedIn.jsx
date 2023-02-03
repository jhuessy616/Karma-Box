import {Button} from "reactstrap";
import { useNavigate } from "react-router-dom";

export default function NotLogedIn() {
    const navigate = useNavigate();
    return (
        <>
            <h1 className="txtcenter">it looks like you don't have a Karma Box acount yet</h1>
            <h1 className="txtcenter">or are not loged in</h1>
            <Button color="warning" onClick={() => navigate("/signup")}>sign up today</Button>
            <h2 className="txtcenter">or</h2>
            <Button color="worning" onClick={() => navigate("/payment")}>continue as guest</Button>
        </>
    );
}

