// ! Dependencies imported
import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import MessageCreate from "../Messages/MessageCreate";
import MessageTable from "../Messages/MessageTable";

//! Declaration of Variables
const MessageIndex = (props) => {
  const [messages, setMessages] = useState([]);
  const fetchMessage = async () => {
    //! Url our page is hosted on
    const url = `http://localhost:4000/message/view-all`;
    let myHeaders = new Headers();
    myHeaders.append("Authorization", props.token);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      setMessages(data.messages);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (props.token) {
      fetchMessage();
    }
  }, [props.token]);

  //! Container that hosted the create message and display message.
  return (
    <>
      <div className="roomBackground">
        <Container>
          <Row>
            <Col md="4">
              <MessageCreate token={props.token} fetchMessage={fetchMessage} />
            </Col>
            <Col md="8">
              <MessageTable
                messages={messages}
                token={props.token}
                fetchMessage={fetchMessage}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default MessageIndex;
