// ! Dependencies imported
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// ! Styling imported from reactstrap
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Col,
  Container,
  Row,
} from "reactstrap";
import FullWidthButton from "../../Buttons/FullWidthButton";
import { useParams } from "react-router-dom";
import Navbar from "../../../home/NavBar";
import "./login.css";

function ForgotResetPassword(props) {
  const { id, token } = useParams();
  const [form, setForm] = useState("loading");

  const fetchData = async () => {
    const url = `http://localhost:4000/user/resetpassword/${id}/${token}`;
    let myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log(data);
      if (data.message === "Success") {
          setForm(true);
      }
      console.log(data.message);
    } catch (err) {
      console.log(err.message);
    }
  };
  fetchData();
  //! Input field where user enters information

  return (
    <div className="Background">
      <Navbar></Navbar>

      <Container className="forgotResetPasswordFormContainer">
              {form === "loading" ? (
        <h1></h1>
        ) : form?(
          // <h1 className="txtcenter">Reset your password</h1>
          <Row>
            <h1 className="txtcenter">Reset your password</h1>
            <Col lg="4" md="4" xs="2"></Col>
            <Col lg="4" md="4" xs="8">
              <div>
                <Form
                  action={`http://localhost:4000/user/resetpassword/${id}/${token}`}
                  method="post"
                >
                  <FormGroup floating>
                    <Input
                      id="newPassword"
                      name="newPassword"
                      placeholder="New Password"
                      type="password"
                    />
                    <Label for="newPassword">New Password</Label>
                  </FormGroup>{" "}
                  <FullWidthButton>
                    <Input type="submit" value="Reset Password"></Input>
                  </FullWidthButton>
                </Form>
              </div>
            </Col>
            <Col lg="4" md="4" xs="2"></Col>
          </Row>
        ) : (
          //   TimeOut()
          <h1 className="txtcenter" style={{ marginTop: 50 }}>
            This link is no longer valid
          </h1>
        )}
      </Container>
    </div>
  );
}

export default ForgotResetPassword;
