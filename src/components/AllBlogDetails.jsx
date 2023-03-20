import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import "../css/AllBlogDetails.css";

export const AllBlogDetails = ({ blogs, isAuth }) => {
  const { id } = useParams();
  const blog = blogs.find((blog) => blog.id === id);
  const [like, setLike] = useState(0);
  const [likeActive, setLikeActive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuth) {
      window.location.pathname = "/login";
    }
  }, []);

  useEffect(() => {
    if (blog) {
      setLoading(false);
    }
  }, [blog]);

  function likemethod() {
    if (likeActive) {
      setLikeActive(false);
      setLike(like - 1);
    } else {
      setLikeActive(true);
      setLike(like + 1);
    }
  }

  return (
    <div className="blog-details">
      {loading ? (
        <PulseLoader
          className="loader"
          color={"#f1356d"}
          loading={loading}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
          speedMultiplier={0.8}
        />
      ) : (
        <>
          <div className="blog-cls">
            <button className="a" onClick={likemethod}>
              Like {like}
            </button>
          </div>
          <div>
            <article>
              <h2>{blog.title}</h2>
              <p>Written by {blog.author}</p>
              <div>{blog.postText}</div>
            </article>
          </div>
        </>
      )}
    </div>
  );
};
