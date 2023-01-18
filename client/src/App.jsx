import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
// !below are the routes I am importing to the sign in and log in pages
import Auth from "./components/Authorization/user/Auth";
import ProfileIndex from "./components/ProfilePage/ProfileIndex"
import ProfileEdit from "./components/ProfilePage/ProfileEdit"


function App() {
  const [sessionToken, setSessionToken] = useState("");

  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
    }
  }, []);

  //! Declaration of Routes
  return (
    <div>
      <Routes>
        <Route path="/" element={<Auth updateToken={updateToken} />} />
        <Route path="/" element={<ProfileIndex token={sessionToken} />} />
        <Route
          path="/"
          element={<ProfileEdit token={sessionToken} />}
        />
      </Routes>
    </div>
  );
}

export default App;