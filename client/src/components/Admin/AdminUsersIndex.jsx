// ! Dependencies imported
import React, { useState, useEffect } from "react";

import { Col, Container, Row, Table } from "reactstrap";

import AdminNavbar from "../Admin/AdminNavbar";

import "../ProfilePage/ProfileIndex.css";

//! Declaration of Vairables
const AdminUsersIndex = (props) => {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    const url = "http://localhost:4000/user/";
    let myHeaders = new Headers();
    myHeaders.append("Authorization", props.token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      setUsers(data.allUsers);
     
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    if (props.token) {
      fetchUsers();
    }
  }, [props.token]);

  
  //! Container that hosted the create chatroom and display chatroom.
  return (
    <div className="Background">
      <AdminNavbar token={props.token}></AdminNavbar>
      <Container className="profilepage">
        <h1 className="txtcenter ">Karma Box Administrator</h1>
        <h2 className="txtcenter">All Users</h2>

        <Row>
          <Col lg="1" md="1" xs="1"></Col>
          <Col lg="10" md="10" xs="10">
            <div className="total-donations">
              {/* <h1 className="txtcenter">Total Donated: ${totalDonated}</h1>{" "} */}
            </div>
                      <Table striped className="donations-table" style={{ marginTop: 20}}>
              {/* <thead>
                <tr>
                  <th>User</th>
                </tr>
              </thead> */}
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                        <td scope="row">{user.email}</td>
                        <td>Update</td>
                        <td>Delete</td>
                    
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>

          <Col lg="1" md="1" xs="1">
            {" "}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminUsersIndex;
