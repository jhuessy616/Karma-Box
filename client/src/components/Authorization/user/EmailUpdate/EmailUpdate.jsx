import React, { useRef } from "react";
import { useNavigate } from "react-router-dom"
import { Button, InputGroup, Form, FormGroup, Input, Label, Col, Container, Row } from "reactstrap";
import jwt_decode from "jwt-decode";
import FullWidthButton from "../../Buttons/FullWidthButton";
import ProfileNavbar from "../../../ProfilePage/ProfileNavBar"
import { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import sanitize from "../../../../utils/sanitizeinput";


//! Declaration of Vairables
const EmailUpdate = (props) => {
	const currentPasswordRef = useRef();
	const newEmailRef = useRef();
	const confirmNewEmailRef = useRef();
	const formRef = useRef();
	const navigate = useNavigate();
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
    const email = sanitize(newEmailRef.current.value);
    const confirmEmail = sanitize(confirmNewEmailRef.current.value);
    if (email !== confirmEmail) {
      setErrorMessage("New Emails Do Not Match");
    } else if (email.length < 5) {
      setErrorMessage("Please enter a valid email");
    } else {
      //!Url our page is hosed on
      let url = `http://localhost:4000/user/update/${decoded.id}`;
      let bodyObject = JSON.stringify({ currentPassword, email });

      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", props.token);

      const requestOptions = {
        headers: myHeaders,
        body: bodyObject,
        method: "PATCH",
      };
      //! function that runs when the user hits the signup button, that then allows them to log in
      try {
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        console.log(data);
		  if (data.message === "User updated") {
			  //We are free to navigate to another page
			  //   props.updateToken(data.token);
			  setErrorMessage("Email successfully updated");
			  formRef.current.reset();
		  }
		  else if (data.message.includes("email_1 dup key")) {
			  setErrorMessage(["Email already exists.", <br/>, "Please use a different email."])
		}
		else {
         setErrorMessage(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  }

	//! Container that hosted the create chatroom and display chatroom.
	return (
    <div className="Background">
      <ProfileNavbar
        token={props.token}
        setSessionToken={props.setSessionToken}
      ></ProfileNavbar>
      <Container className="logInFormContainer">
        <Row>
          <h1 className="txtcenter">Update Your Email</h1>
          <div class="col-2 col-md-3 col-lg-4"></div>

          <div class="col-8 col-md-6 col-lg-4">
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
              <FormGroup floating>
                <Input
                  id="newEmail"
                  name="newEmail"
                  placeholder="newEmail"
                  type="email"
                  innerRef={newEmailRef}
                />
                <Label for="exampleEmail">New Email</Label>
              </FormGroup>{" "}
              <FormGroup floating>
                <Input
                  id="confirmNewEmail"
                  name="confirmNewEmail"
                  placeholder="confirmNewEmail"
                  type="email"
                  innerRef={confirmNewEmailRef}
                />
                <Label for="confirmNewEmail">Confirm New Email</Label>
              </FormGroup>{" "}
              <p className="txtcenter">{errorMessage}</p>
              <FullWidthButton>
                <Button type="submit" color="warning">
                  Update Email
                </Button>
              </FullWidthButton>
            </Form>
          </div>

          <Col lg="4" md="3" xs="2"></Col>
        </Row>
      </Container>
    </div>
  );
};

export default EmailUpdate;
