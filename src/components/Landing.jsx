import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      <h1>Welcome to BlogPost</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Landing;
