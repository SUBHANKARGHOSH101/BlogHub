import React from "react";
import { useParams } from "react-router-dom";
import { updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import PulseLoader from "react-spinners/PulseLoader";
import ReactMarkdown from "react-markdown";
import "../css/BlogEdit.css";
const BlogEdit = ({ blogs, setBlogs }) => {
  const { id } = useParams();
  const blog = blogs.find((blog) => blog.id === id);
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [title, setTitle] = useState(blog.title);
  const [bodyText, setBodyText] = useState(blog.postText);

  const cancelBlog = () => {
    navigate(`/blogdetails/${id}`);
  };

  const handleEditBlog = async (e) => {
    e.preventDefault();

    try {
      const blogRef = doc(db, "blogposts", id);

      // Ensure that title and bodyText are defined before updating the document
      if (title && bodyText) {
        await updateDoc(blogRef, {
          title: title,
          postText: bodyText,
          editedat: serverTimestamp(),
        });

        // Update the blog in the local state
        setBlogs((prevBlogs) => {
          return prevBlogs.map((prevBlog) => {
            if (prevBlog.id === id) {
              return {
                ...prevBlog,
                title: title,
                postText: bodyText,
                editedat: serverTimestamp(),
              };
            } else {
              return prevBlog;
            }
          });
        });

        // Navigate back to the blog details page
        navigate(`/blogdetails/${id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    if (blog) {
      setLoading(false);
    }
  }, [blog]);

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
    <div className="create">
      <h2 className="newblogtitle">Edit Blog</h2>
      <form>
        <label>Blog title:</label>
        <input
          type="text"
          required
          className="textForArea"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog body:</label>
        <div className="center-div">
          <textarea
            className="textForArea"
            type="text"
            value={bodyText}
            onChange={(e) => setBodyText(e.target.value)}
          ></textarea>
          <div className="markdownarea">
            <ReactMarkdown>{bodyText}</ReactMarkdown>
          </div>
        </div>
        <button onClick={handleEditBlog}>Edit Blog</button>
        <button onClick={cancelBlog}>Cancel</button>
      </form>
    </div>
  );
};

export default BlogEdit;
