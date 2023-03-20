import React from "react";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import "../css/Login.css";

export const Login = ({ setIsAuth }) => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      window.location.pathname = "/home";
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
