import React from "react";
import "../css/Landing.css";
import logo from "../images/logo.jpg";

const Landing = ({ onLogin }) => {
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
