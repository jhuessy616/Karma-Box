import { Button } from "reactstrap";

function AdminDelete({ user, fetchUsers, token }) {
  const handleClick = async (e) => {
    e.preventDefault();
    let id = user._id;
    let url = `http://localhost:4000/user/delete/${id}`;

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", token);
    const requestOptions = {
      headers: myHeaders,
      method: "DELETE",
    };
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      JSON.parse(data);
      if (data.message === "User was deleted") {
        alert("User was deleted");
      }
    } catch (error) {
      console.log(error.message);
    }
    fetchUsers();
  };
  return (
    <div>
      <button className="KBSignUpButton" onClick={handleClick} color="danger">
        DELETE
      </button>
    </div>
  );
}

export default AdminDelete;
