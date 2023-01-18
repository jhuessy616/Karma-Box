// ! Dependencies imported
import { useNavigate } from "react-router-dom";
import { Button, Table } from "reactstrap";
import ProfileTable from "../ProfilePage/ProfileTable";

//! Declaration of Variables and delete function
const MessageTable = (props) => {
  const navigate = useNavigate();
  async function deleteMessage(id) {
    const url = `http://localhost:4000/message/${id}`;
    let myHeaders = new Headers();
    myHeaders.append("Authorization", props.token);

    let requestOptions = {
      headers: myHeaders,
      method: "DELETE",
    };
    try {
      let response = await fetch(url, requestOptions);
      let data = await response.json();
      console.log(data);
      props.fetchMessage();
    } catch (error) {
      console.log(error.message);
    }
  }

  //! This is the table that pulls information from the database to display for user to view
  return (
    <>
      <Table style={{ backgroundColor: "lavender" }} striped>
        <thead>
          <tr>
            <th>Chat Room:</th>
            <th>Added By: </th>
            <th>Message: </th>
            <th>Submitted At:</th>
          </tr>
        </thead>
        <tbody>
          {props.messages.map((message) => (
            <tr key={message._id}>
              <th class="table-success" scope="row">
                {message.room}
              </th>
              <td class="table-primary">{message.user}</td>
              <td class="table-warning">{message.body}</td>
              <td class="table-success">{message.when}</td>
              <td class="table-danger">
                {" "}
                <Button
                  color="danger"
                  onClick={() => deleteMessage(message._id)}
                >
                  DELETE
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default MessageTable;
