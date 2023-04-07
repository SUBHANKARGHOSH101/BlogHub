import React from "react";
import "../css/Landing.css";
import logo from "../images/logo.jpg";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Landing = ({ onLogin, user }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      navigate("/home");
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="landing-container">
      <div className="landing-image-container">
        <img src={logo} alt="BlogPost Logo" className="landing-image" />
      </div>
      <h1 className="landing-title">Welcome to BlogPost</h1>
      <div className="landing-para">
        Join the discussion with BlogPost, a platform for views that matter.
      </div>
      <button className="landing-button" onClick={onLogin}>
        Login
      </button>
    </div>
  );
};

export default Landing;
