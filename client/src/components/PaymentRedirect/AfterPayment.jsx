import {Button} from "reactstrap";
import { useLocation } from "react-router-dom";

export default function AfterPayment() {

    const params = useLocation().search;
    let returnUrl = new URLSearchParams(params).get("return");
    console.log(returnUrl)


  
    return (
        <>
            <Button onClick={() => window.location.href = returnUrl}>return to the organization</Button>
        </>
    );
}
