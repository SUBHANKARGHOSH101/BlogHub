import React from "react";
import { auth } from "../firebase-config";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import "../css/Blogs.css";

export const Blogs = ({ blogs, title, isAuth }) => {
  useEffect(() => {
    if (!isAuth) {
      window.location.pathname = "/login";
    }
  }, []);
  return (
    <>
      <div className="allblog-list">
        <h2 className="allmiddle">{title}</h2>
        {blogs.map(
          (blog) =>
            isAuth &&
            blog.user_id !== auth.currentUser.email && (
              <Link to={`/allblog-details/${blog.id}`} className="link-com">
                <div className="allblog-preview" key={blog.id}>
                  <h2>{blog.title}</h2>
                  <p className="alllink-p">Written by {blog.author}</p>
                  {/* <button onClick={() => handleDelete(blog.id)}>delete blog</button> */}
                </div>
              </Link>
            )
        )}
      </div>
    </>
  );
};
