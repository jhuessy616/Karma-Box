import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
// !below are the routes I am importing to the sign in and log in pages
import Login from "./components/Authorization/user/login/Login";
import SignUpPage from "./components/Authorization/user/SignUpPage";
import ProfileIndex from "./components/ProfilePage/ProfileIndex"
import Home from "./components/home/Home";
import About from "./components/home/About";
import Docs from "./components/Docs/Docs"
import './app.css';



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
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login updateToken={updateToken} />} />
        <Route path="/signup" element={<SignUpPage updateToken={updateToken} />} />

        <Route path="/profile" element={<ProfileIndex token={sessionToken} />} />

        
        <Route path="/about" element={<About />} />
        <Route path="docs" element={<Docs />} />

      </Routes>

    </div>
  );
}

export default App;
