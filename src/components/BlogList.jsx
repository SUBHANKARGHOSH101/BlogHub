import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase-config";
import { useState, useEffect } from "react";
import "../css/BlogList.css";
import PulseLoader from "react-spinners/PulseLoader";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

export const BlogList = ({ blogs, title }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [user] = useAuthState(auth);
  // useEffect(() => {
  //   if (!user) {
  //     navigate("/login");
  //   }
  // }, [user]);

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
        {blogs.map((blog) => (
          <Link
            to={`/blogdetails/${blog.id}`}
            className="link-com"
            key={blog.id}
          >
            <div className="blog-preview">
              <div className="list-cls">
                <h2 className="blog-title">
                  {blog.title.length > 20
                    ? blog.title.slice(0, 20) + "..."
                    : blog.title}
                </h2>
                <span className="blog-like">{blog.likes.length} likes</span>
              </div>
              <p className="link-p">Written by {blog.author}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};
