import { Button } from "reactstrap";
import Navbar from "../../../home/NavBar";
import { Link } from "react-router-dom";


function PaymentRedirect(){
    let url = `http://localhost:4000/user/paymentRedirect`;

return (
    <div className="Background">
      <Navbar></Navbar>
      <h1
        className="txtcenter"
        style={{ paddingTop: "25vh", justifySelf: "center" }}
      >
        Thank you for donating through Karma Box! 
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Link to="/profile">
          <Button type="submit" color="warning">
            Head back to your previous website!
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default PaymentRedirect;