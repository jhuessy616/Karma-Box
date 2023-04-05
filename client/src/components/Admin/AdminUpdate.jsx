import { useState } from "react";
import {
  Form,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

function AdminUpdate({ token, fetchUsers, user }) {
  const [email, setEmail] = useState(user.email);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleSubmit = async(e) => {
    e.preventDefault();
    let id = user._id;
    let url = `http://localhost:4000/user/admin-email-update/${id}`;
    let bodyObject = JSON.stringify({ email });
    let myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json")

    const requestOptions = {
      headers: myHeaders,
      body: bodyObject,
      method: "PUT"
    };
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      if (data.message === 'success') {
        setEmail(data.updateEmail.email)
      } else {
        alert('unable to update email')
      }
    } catch(error) {
        console.log(error)
    }
    fetchUsers();
    toggle();
  };

  const handleChange = (e) => {
    setEmail(e.target.value)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit()
    }
  }

  return (
    <div>
      <button className="KBSignUpButton" onClick={toggle}>UPDATE</button>
      <Modal isOpen={modal} toggle={toggle} user={user} centered>
        <ModalHeader toggle={toggle}>{email}</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <Label>
              <Input
                type="text"
                value={email}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
              />
            </Label>
          </Form>
        </ModalBody>
        <ModalFooter>
          <button className="KBSignUpButton" color="warning" onClick={handleSubmit}>
            Update
          </button>
          <button className="KBSignUpButton" onClick={toggle}>Cancel</button>
        </ModalFooter>
      </Modal>
    </div>
  );
  
}

export default AdminUpdate;
