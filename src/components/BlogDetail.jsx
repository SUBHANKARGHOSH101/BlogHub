import React from "react";
import { useParams } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { useState, useEffect } from "react";
import "../css/BlogDetail.css";
import PulseLoader from "react-spinners/PulseLoader";

export const BlogDetail = ({ blogs, isAuth }) => {
  const { id } = useParams();
  const blog = blogs.find((blog) => blog.id === id);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuth) {
      window.location.pathname = "/login";
    }
    // else {
    //   setLoading(true);
    //   setTimeout(() => {
    //     setLoading(false);
    //   }, 2000);
    // }
  }, []);

  useEffect(() => {
    if (blog) {
      setLoading(false);
    }
  }, [blog]);

  // if (blogs) {
  //   setLoading(false);
  // }

  const deletePost = async (id) => {
    const postDoc = doc(db, "blogposts", id);
    await deleteDoc(postDoc);
    window.location.pathname = "/home";
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
        {isAuth && blog.user_id === auth.currentUser.email && (
          <button
            className="a"
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
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.postText}</div>
        </article>
      </div>
    </div>
  );
};
