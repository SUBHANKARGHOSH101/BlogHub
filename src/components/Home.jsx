import React from "react";
import { BlogList } from "./BlogList";
import { useEffect } from "react";
import "../css/Home.css";

export const Home = ({ blogs, isAuth }) => {
  useEffect(() => {
    if (!isAuth) {
      window.location.pathname = "/login";
    }
  }, []);
  return (
    <div className="home">
      {<BlogList blogs={blogs} title="My Blogs" isAuth={isAuth} />}
    </div>
  );
};
