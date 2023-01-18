// ! Dependencies imported
import { useRef } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import FullWidthButton from "../Authorization/Buttons/FullWidthButton";

//! Declaration of Variables
const MessageCreate = (props) => {
  const roomRef = useRef();
  const userRef = useRef();
  const bodyRef = useRef();
  const whenRef = useRef();
  const formRef = useRef();

  //! Function to handle the submit button
  async function handleSubmit(e) {
    e.preventDefault();
    const room = roomRef.current.value;
    const user = userRef.current.value;
    const body = bodyRef.current.value;
    const when = whenRef.current.value;

    //! Url our page is hosted on
    let url = `http://localhost:4000/message/create`;

    let bodyObject = JSON.stringify({
      room,
      user,
      body,
      when,
    });

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", props.token);

    const requestOptions = {
      headers: myHeaders,
      body: bodyObject,
      method: "POST",
    };
    //! function that runs that allows user to create a new message
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      props.fetchMessage();
      formRef.current.reset();
      console.log("Successfully added a new message");
    } catch (error) {
      console.log(error.message);
    }
  }

  //! Input field where user enters information to create a new message
  return (
    <>
      <h2>Create Message Below</h2>
      <Form
        style={{ backgroundColor: "lavenderblush" }}
        onSubmit={handleSubmit}
        innerRef={formRef}
      >
        <FormGroup floating>
          <Input
            id="chatroom"
            name="chatroom"
            placeholder="Chatroom: "
            type="name"
            innerRef={roomRef}
          />
          <Label for="firstName">Chat Room:</Label>
        </FormGroup>{" "}
        <FormGroup floating>
          <Input
            id="addedBy"
            name="addedBy"
            placeholder="Added By:"
            type="name"
            innerRef={userRef}
          />
          <Label for="addedBy">Added By:</Label>
        </FormGroup>{" "}
        <FormGroup floating>
          <Input
            id="message"
            name="message"
            placeholder="Message:"
            innerRef={bodyRef}
            type="textarea"
          />
          <Label for="message">Message:</Label>
        </FormGroup>{" "}
        <FormGroup floating>
          <Input
            id="submittedAt"
            name="submittedAt"
            placeholder="Submitted At:"
            type="time"
            innerRef={whenRef}
          />
          <Label for="submittedAt">Submitted At:</Label>
        </FormGroup>{" "}
        <FullWidthButton>
          <Button type="submit" color="primary">
            Create Message
          </Button>
        </FullWidthButton>
      </Form>

      {/* 
      <Form style={{backgroundColor:"lavenderblush"}} onSubmit={handleSubmit} innerRef={formRef}>
      <FormGroup>
          <Label>Chat Room: </Label>
          <Input innerRef={roomRef} />
        </FormGroup>
        <FormGroup>
          <Label>Added By: </Label>
          <Input innerRef={userRef} />
        </FormGroup>
        <FormGroup>
          <Label>Message: </Label>
          <Input innerRef={bodyRef} type="textarea" />
        </FormGroup>
          <FormGroup>
          <Label>Messaged Submitted At: </Label>
          <Input innerRef={whenRef} />
        </FormGroup>
        <FullWidthButton>
          <Button color="primary">Create Message</Button>
        </FullWidthButton>
      </Form> */}
    </>
  );
};

export default MessageCreate;
