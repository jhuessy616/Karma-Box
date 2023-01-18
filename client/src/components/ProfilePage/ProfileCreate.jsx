// ! Dependencies imported
import { useRef } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import FullWidthButton from "../Authorization/Buttons/FullWidthButton";

//! Declaration of Variables
const ChatroomCreate = (props) => {
  const nameRef = useRef();
  const descriptionRef = useRef();
  const addedUsersRef = useRef();
  const formRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const name = nameRef.current.value;
    const description = descriptionRef.current.value;
    // const addedUsers = addedUsersRef.current.value;

    //! Url our page is hosed on
    let url = `http://localhost:4000/room/create`;

    let bodyObject = JSON.stringify({
      name,
      description,
    });

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", props.token);

    const requestOptions = {
      headers: myHeaders,
      body: bodyObject,
      method: "POST",
    };

    //! function that runs that allows user to create a new chatroom
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      props.fetchChatrooms();
      formRef.current.reset();
      console.log("Successfully added a new chatroom");
    } catch (error) {
      console.log(error.message);
    }
  }

  //! Input field where user enters information to create a new chatroom
  return (
    <>
      <h2>Create a Chatroom</h2>
      <Form
        style={{ backgroundColor: "lightslategray" }}
        onSubmit={handleSubmit}
        innerRef={formRef}
      >
        <FormGroup floating>
          <Input
            id="chatroomName"
            name="chatroomName"
            placeholder="Chatroom"
            type="name"
            innerRef={nameRef}
          />
          <Label for="chatroomName">Chatroom Name:</Label>
        </FormGroup>{" "}
        <FormGroup floating>
          <Input
            id="chatroomDescription"
            name="chatroomDescription"
            placeholder="Chatroom Description:"
            type="textarea"
            innerRef={descriptionRef}
          />
          <Label for="chatroomDescription">Chatroom Description:</Label>
        </FormGroup>{" "}
        <FullWidthButton>
          <Button color="primary">Create Chatroom</Button>
        </FullWidthButton>
      </Form>
    </>
  );
};

export default ChatroomCreate;
