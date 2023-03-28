import React from "react";
import { useParams } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { useState, useEffect } from "react";
import "../css/BlogDetail.css";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import PulseLoader from "react-spinners/PulseLoader";
import ReactMarkdown from "react-markdown";

export const BlogDetail = ({ blogs, setBlogs }) => {
  const { id } = useParams();
  const blog = blogs.find((blog) => blog.id === id);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [user] = useAuthState(auth);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    if (blog) {
      setLoading(false);
    }
  }, [blog]);

  const deletePost = async (id) => {
    const postDoc = doc(db, "blogposts", id);
    await deleteDoc(postDoc);
    setBlogs(blogs.filter((blog) => blog.id !== id));
    navigate("/");
  };

  const pressback = () => {
    navigate("/");
  };

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
    <div className="blog-details">
      <div className="blog-cls">
        <button
          className="tags"
          onClick={() => {
            pressback();
          }}
        >
          Back
        </button>
        {blog.user_id === auth.currentUser.email && (
          <button
            className="tags"
            onClick={() => {
              deletePost(blog.id);
            }}
          >
            Delete
          </button>
        )}
      </div>
      <div>
        <article>
          <h2 className="title">{blog.title}</h2>
          <p className="writtenby">Written by {blog.author}</p>
          <ReactMarkdown className="finalview">{blog.postText}</ReactMarkdown>
        </article>
      </div>
    </div>
  );
};
