// ! Dependencies imported
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// ! Styling imported from reactstrap
import {
  Button,
  Form,
  FormGroup,
    Input,
  InputGroup,
  Label,
  Col,
  Container,
  Row,
} from "reactstrap";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import FullWidthButton from "../../Buttons/FullWidthButton";
import { useParams } from "react-router-dom";
import Navbar from "../../../home/NavBar";
import "./login.css";

function ForgotResetPassword(props) {
  const { id, token } = useParams();
    const [form, setForm] = useState("loading");
    const [message, setMessage] = useState();
    const [passwordMatchMessage, setPasswordMatchMessage] = useState();
    const [disabled, setDisabled] = useState(false);
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const formRef = useRef();
    const navigate = useNavigate();
      const [state, setState] = useState(false);
      const toggleBtn = (e) => {
        e.preventDefault();
        setState((prevState) => !prevState);
      };
    

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
          setForm("valid");
      }
      else {
          setForm("notvalid")
        }
    } catch (err) {
      console.log(err.message);
    }
  };
    useEffect( ( ) => {
        fetchData();
    }, [] )
    
    async function handleSubmit(e) {
        e.preventDefault();
       

        const newPassword = passwordRef.current.value;
        const confirmNewPassword = confirmPasswordRef.current.value
        if (newPassword !== confirmNewPassword) {
            setPasswordMatchMessage("Passwords do not match")
        }
        else if (newPassword.length < 6) {
            setPasswordMatchMessage('Passwords must have at least six characters')
        }
        else {
 setPasswordMatchMessage();
            //!Url our page is hosed on
            let url = `http://localhost:4000/user/resetpassword/${id}/${token}`;

            let bodyObject = JSON.stringify({ newPassword });

            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const requestOptions = {
                headers: myHeaders,
                body: bodyObject,
                method: "POST",
            };
            //! function that runs when the user hits the login button to bring to new page
            try {
                const response = await fetch(url, requestOptions);
                const data = await response.json();
                console.log(data);
                if (data.message === "Password Updated") {
                    formRef.current.reset();
                  
                    setMessage("Password succesfully updated");
                    setDisabled(true)
                    // navigate("/login");
                    console.log(form);
                } else {
                    setMessage(data.message);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
    }
  //! Input field where user enters information

  return (
    <div className="Background">
      <Navbar></Navbar>

      <Container className="forgotResetPasswordFormContainer logInFormContainer">
        <h1></h1>
        {form === "valid" ? (
          // <h1 className="txtcenter">Reset your password</h1>
          <Row>
            <h1 className="txtcenter">Reset your password</h1>
            <Col lg="4" md="4" xs="2"></Col>
            <Col lg="4" md="4" xs="8">
              <div>
                <Form
                  onSubmit={handleSubmit}
                  innerRef={formRef}
                 
                >
                  <InputGroup className="signupinputgroup">
                    <FormGroup floating>
                      <Input
                        id="newPassword"
                        name="newPassword"
                        placeholder="New Password"
                        type={state ? "text" : "password"}
                        innerRef={passwordRef}
                        disabled={disabled}
                      />
                      <Label for="newPassword">New Password</Label>
                    </FormGroup>{" "}
                    <Button
                      className="eyebtn input-group-text"
                      onClick={toggleBtn}
                    >
                      {state ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </Button>
                  </InputGroup>

                  <InputGroup className="signupinputgroup">
                    <FormGroup floating>
                      <Input
                        id="confirmNewPassword"
                        name="confirmNewPassword"
                        placeholder="Confirm New Password"
                        type={state ? "text" : "password"}
                        innerRef={confirmPasswordRef}
                        disabled={disabled}
                      />
                      <Label for="confirmNewPassword">
                        Confirm New Password
                      </Label>
                    </FormGroup>{" "}
                    <Button
                      className="eyebtn input-group-text"
                      onClick={toggleBtn}
                    >
                      {state ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </Button>
                  </InputGroup>
                  {}
                  <p className="txtcenter">{passwordMatchMessage}</p>

                  <FullWidthButton>
                    <Input
                      type="submit"
                      className="warningcolor"
                      value="Reset Password"
                    ></Input>
                  </FullWidthButton>
                </Form>
              </div>
            </Col>
            <Col lg="4" md="4" xs="2"></Col>
            <p className="txtcenter">{message}</p>
          </Row>
        ) : form === "notvalid" ? (
          <h1 className="txtcenter" style={{ marginTop: 50 }}>
            This link is no longer valid
          </h1>
        ) : (
          <h1></h1>
        )}
      </Container>
    </div>
  );
}

export default ForgotResetPassword;
