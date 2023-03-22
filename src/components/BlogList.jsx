import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase-config";
import { useState, useEffect } from "react";
import "../css/BlogList.css";
import PulseLoader from "react-spinners/PulseLoader";

export const BlogList = ({ blogs, title, isAuth }) => {
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
    <>
      <h2 className="middle">{title}</h2>
      <div className="blog-list">
        {blogs.map((blog) => {
          if (
            isAuth &&
            auth.currentUser &&
            blog.user_id === auth.currentUser.email
          ) {
            return (
              <Link to={`/blog-details/${blog.id}`} className="link-com">
                <div className="blog-preview" key={blog.id}>
                  <div className="list-cls">
                    <h2 className="blog-title">{blog.title}</h2>
                  </div>
                  <p className="link-p">Written by {blog.author}</p>
                </div>
              </Link>
            );
          } else {
            return null;
          }
        })}
      </div>
    </>
  );
};
