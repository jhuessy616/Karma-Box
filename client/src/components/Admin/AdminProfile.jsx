// ! Dependencies imported
import React, { useState, useEffect } from "react";

import { Col, Container, Row, Table } from "reactstrap";

import AdminNavbar from "../Admin/AdminNavbar";

import "../ProfilePage/ProfileIndex.css";

//! Declaration of Vairables
const AdminProfile = (props) => {
  const [donations, setDonations] = useState([]);
  const fetchDonations = async () => {
    const url = "http://localhost:4000/donations/alldonations";
    let myHeaders = new Headers();
    myHeaders.append("Authorization", props.token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      setDonations(data.donations);
      console.log(donations);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    if (props.token) {
      fetchDonations();
    }
  }, [props.token]);

  let totalDonated = 0;
  for (let donation of donations) {
    totalDonated += donation.amount;
  }
  //! Container that hosted the create chatroom and display chatroom.
  return (
    <div className="Background">
      <AdminNavbar token={props.token}></AdminNavbar>
      <Container className="profilepage">
        <h1 className="txtcenter ">Karma Box administrator</h1>
        <h2 className="txtcenter">All Donations</h2>

        <Row>
          <Col lg="1" md="1" xs="1"></Col>
          <Col lg="10" md="10" xs="10">
            <div className="total-donations">
              <h1 className="txtcenter">Total Donated: ${totalDonated}</h1>{" "}
            </div>
            <Table striped className="donations-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>User</th>
                  <th>Organization</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((donation) => (
                  <tr key={donation._id}>
                    <td scope="row">{donation.date}</td>
                    <td>{donation.user.email}</td>
                    <td>{donation.organization}</td>
                    <td>${donation.amount}</td>
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

export default AdminProfile;
