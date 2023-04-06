import React from "react";
import { useState, useEffect, useRef } from "react";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import "../css/NewBlog.css";
// import PulseLoader from "react-spinners/PulseLoader";
// import JoditEditor from "jodit-react";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import ReactMarkdown from "react-markdown";

export const NewBlog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [loading, setLoading] = useState(true);
  const textareaRef = useRef(null);

  // const postsCollection = collection(db, "blogposts");

  const createPost = async (e) => {
    e.preventDefault();
    const docid = nanoid();
    await setDoc(doc(db, "blogposts", docid), {
      title: title,
      postText: postText,
      author: auth.currentUser.displayName,
      id: docid,
      user_id: auth.currentUser.email,
      likes: [],
      timestamp: serverTimestamp(),
    });
    window.location.pathname = "/home";
  };
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);
  return (
    <div className="create">
      <h2 className="newblogtitle">Add a New Blog</h2>
      <form>
        <label>Blog title:</label>
        <input
          type="text"
          required
          className="textForArea"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog body:</label>
        <div className="center-div">
          <textarea
            ref={textareaRef}
            className="textForArea"
            type="text"
            onChange={(e) => setPostText(e.target.value)}
            value={postText}
          ></textarea>
          <div className="markdownarea">
            <ReactMarkdown>{postText}</ReactMarkdown>
          </div>
        </div>
        <button onClick={createPost}>Add Blog</button>
      </form>
    </div>
  );
};
