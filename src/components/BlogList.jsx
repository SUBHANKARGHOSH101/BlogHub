import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase-config";
import { useState, useEffect } from "react";
import "../css/BlogList.css";

export const BlogList = ({ blogs, title, isAuth }) => {
  useEffect(() => {
    if (!isAuth) {
      window.location.pathname = "/login";
    }
  }, []);

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
                {/* <div className="blog-preview" key={blog.id}>
                  <div className="list-cls">
                    <h2 className="blog-title">{blog.title}</h2>
                  </div>
                  <p className="link-p">Written by {blog.author}</p>
                </div> */}
                <ul class="card-list">
                  <li class="card"></li>
                </ul>
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
