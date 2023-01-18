// ! Dependencies imported
import { useNavigate } from "react-router-dom";
import { Button, Table } from "reactstrap";

//! Declaration of Variables and delete function
const ChatroomTable = (props) => {
  const navigate = useNavigate();
  async function deleteChatroom(id) {
    const url = `http://localhost:4000/room/${id}`;
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
      props.fetchChatrooms();
    } catch (error) {
      console.log(error.message);
    }
  }

  //! This is the table that pulls information from the database to display for user to view
  return (
    <>
      <Table striped>
        <thead>
          <tr>
            <th>Chatroom Name</th>
            <th>Description</th>
            {/* <th>Added Users</th> */}
          </tr>
        </thead>
        <tbody>
          {props.chatrooms.map((chatroom) => (
            <tr key={chatroom._id}>
              <th class="table-success" scope="row">
                {chatroom.name}
              </th>
              <td class="table-primary">{chatroom.description}</td>
              {/* <td>{chatroom.addedUsers}</td> */}
              <td class="table-warning">
                <Button
                  color="primary"
                  onClick={() => navigate(`/room/${chatroom._id}`)}
                >
                  VIEW
                </Button>
              </td>
              <td class="table-danger">
                {" "}
                <Button
                  color="danger"
                  onClick={() => deleteChatroom(chatroom._id)}
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

export default ChatroomTable;
