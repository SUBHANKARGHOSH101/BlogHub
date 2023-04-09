import React from "react";
import { auth } from "../firebase-config";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../css/Blogs.css";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

export const Blogs = ({ blogs, title, setBlogs }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return (
    <>
      <div className="allblog-list">
        <div className="allblog-title">
          <h2 className="allmiddle">{title}</h2>
        </div>
        <div className="search">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchQuery}
            className="allblog-search"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {blogs.length ? (
          blogs
            .sort((a, b) => b.timestamp - a.timestamp)
            .filter(
              (blog) =>
                blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                blog.author.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((blog) => (
              <Link
                to={{
                  pathname: `/blogs/allblogdetails/${blog.id}`,
                }}
                className="link-com"
                key={blog.id}
              >
                <div className="allblog-preview">
                  <div className="list-cls">
                    <div className="together">
                      <h2 className="blog-title">
                        {blog.title.length > 15
                          ? blog.title.slice(0, 15) + "..."
                          : blog.title}
                      </h2>
                      {blog.editedat ? (
                        <span className="edited">(edited)</span>
                      ) : (
                        <span></span>
                      )}
                    </div>
                    <span className="blog-like">{blog.likes.length} likes</span>
                  </div>
                  <p className="alllink-p">Written by {blog.author}</p>
                  <p className="alllink-p">
                    at {blog.timestamp.toDate().toLocaleString()}
                  </p>
                </div>
              </Link>
            ))
        ) : (
          <p className="warning">No blogs found !!!</p>
        )}
      </div>
    </>
  );
};
