// import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import SignUp from "./pages/signUp";
import Home from "./pages/Home";
import { useState } from "react";
import RefreshHandler from "./RefreshHandler";

function App() {
  const [Authentication, setAuthentication] = useState(false);
  const PriveteRoute = ({ element }) => {
    return Authentication ? element : <Navigate to="/login" />;
  };
  return (
    <div className="">
      <RefreshHandler setAuthentication={setAuthentication} />
      <Routes>
        <Route path="/" element={<Navigate to="/signUp" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/Home" element={<PriveteRoute element={<Home />} />} />
      </Routes>
    </div>
  );
}

export default App;
