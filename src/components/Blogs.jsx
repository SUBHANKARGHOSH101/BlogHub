import React from "react";
import { auth } from "../firebase-config";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../css/Blogs.css";

export const Blogs = ({ blogs, title, isAuth }) => {
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    if (!isAuth) {
      window.location.pathname = "/login";
    }
  }, []);
  return (
    <>
      <div className="allblog-list">
        <div className="allblog-title">
          <h2 className="allmiddle">{title}</h2>
          <input
            type="text"
            placeholder="Search blogs"
            value={searchQuery}
            className="allblog-search"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {blogs
          .filter(
            (blog) =>
              blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              blog.author.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map(
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
