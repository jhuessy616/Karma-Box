// ! Dependencies imported
import React, { useRef } from "react";
import { useState } from "react";
import jwt_decode from "jwt-decode";
import {
  InputGroup,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Col,
  Container,
  Row,
} from "reactstrap";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import FullWidthButton from "../../Buttons/FullWidthButton";
import ProfileNavbar from "../../ProfilePage/ProfileNavBar";

//! Declaration of Vairables
const PasswordReset = (props) => {
  const currentPasswordRef = useRef();
  const newPasswordRef = useRef();
  const confirmNewPasswordRef = useRef();
  const formRef = useRef();
  const decoded = props.token ? jwt_decode(props.token) : "";
  const [errorMessage, setErrorMessage] = useState();

  const [state, setState] = useState(false);
  const toggleBtn = (e) => {
    e.preventDefault();
    setState((prevState) => !prevState);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const currentPassword = currentPasswordRef.current.value;
    const newPassword = newPasswordRef.current.value;
    const confirmNewPassword = confirmNewPasswordRef.current.value;

    if (newPassword !== confirmNewPassword) {
      setErrorMessage("Passwords do not match");
    } else if (newPassword.length < 6) {
      setErrorMessage("Passwords must have at least six characters");
    } else {
      //!Url our page is hosed on
      let url = `http://localhost:4000/user/update/${decoded.id}`;
      let bodyObject = JSON.stringify({ currentPassword, newPassword });

      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", props.token);

      const requestOptions = {
        headers: myHeaders,
        body: bodyObject,
        method: "PATCH",
      };

      try {
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        console.log(data);
        if (data.message === "User updated") {
          setErrorMessage("Password successfully updated");
          formRef.current.reset();
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  return (
    <div className="Background">
      <ProfileNavbar
        token={props.token}
        setSessionToken={props.setSessionToken}
      ></ProfileNavbar>
      <Container className="logInFormContainer">
        <Row>
          <h1 className="txtcenter">Update Your Password</h1>
          <div class="col-2 col-md-4 col-lg-4"></div>

          <div class="col-8 col-md-4 col-lg-4">
            <Form onSubmit={handleSubmit} innerRef={formRef}>
              <InputGroup>
                <FormGroup floating>
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    placeholder="currentPassword"
                    type={state ? "text" : "password"}
                    innerRef={currentPasswordRef}
                  />
                  <Label for="currentPassword">Current Password</Label>
                </FormGroup>{" "}
                <Button className="eyebtn input-group-text" onClick={toggleBtn}>
                  {state ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </Button>
              </InputGroup>
              <InputGroup>
                <FormGroup floating>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    placeholder="newPassword"
                    type={state ? "text" : "password"}
                    innerRef={newPasswordRef}
                  />
                  <Label for="newPassword">New Password</Label>
                </FormGroup>{" "}
                <Button className="eyebtn input-group-text" onClick={toggleBtn}>
                  {state ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </Button>
              </InputGroup>
              <InputGroup>
                <FormGroup floating>
                  <Input
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    placeholder="confirmNewPassword"
                    type={state ? "text" : "password"}
                    innerRef={confirmNewPasswordRef}
                  />
                  <Label for="confirmNewPassword">Confirm New Password</Label>
                </FormGroup>{" "}
                <Button className="eyebtn input-group-text" onClick={toggleBtn}>
                  {state ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </Button>
              </InputGroup>
              <p className="txtcenter">{errorMessage}</p>
              <FullWidthButton>
                <Button type="submit" color="warning">
                  Update Password
                </Button>
              </FullWidthButton>
            </Form>
          </div>

          <Col lg="4" md="4" xs="2"></Col>
        </Row>
      </Container>
    </div>
  );
};

export default PasswordReset;
