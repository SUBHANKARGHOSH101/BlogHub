import React from "react";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import "../css/Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      navigate("/home");
    });
  };
  return (
    <div className="loginPage">
      <h3 className="login-text">Sign In With Google to Continue</h3>
      <div className="login-btn">
        <button className="a" onClick={signInWithGoogle}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
