import React from "react";
import { BlogList } from "./BlogList";
import { useState, useEffect } from "react";
import "../css/Home.css";
import PulseLoader from "react-spinners/PulseLoader";

export const Home = ({ blogs, isAuth }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!isAuth) {
      window.location.pathname = "/login";
    }
  }, []);

  useEffect(() => {
    if (blogs) {
      setLoading(false);
    }
  }, [blogs]);

  if (loading) {
    return (
      <div className="blog-details">
        <PulseLoader
          className="loader"
          color={"#f1356d"}
          loading={loading}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
          speedMultiplier={0.8}
        />
      </div>
    );
  }
  return (
    <div className="home">
      {<BlogList blogs={blogs} title="My Blogs" isAuth={isAuth} />}
    </div>
  );
};
