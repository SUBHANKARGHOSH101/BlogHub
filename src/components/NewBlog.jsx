import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  setDoc,
  getDocs,
  collection,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../firebase-config";
import "../css/NewBlog.css";

import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import ReactMarkdown from "react-markdown";

const NewBlog = ({ setBlogs, blogs }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [loading, setLoading] = useState(true);
  const textareaRef = useRef(null);

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
      editedat: 0,
    });
    const querySnapshot = await getDocs(collection(db, "blogposts"));
    const updatedBlogs = querySnapshot.docs.map((doc) => doc.data());
    setBlogs(updatedBlogs);
    navigate("/home");
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
        <label>
          Blog body:
          {/* <a className="note">
            <FontAwesomeIcon icon={faQuestionCircle} />
          </a> */}
        </label>
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

export default NewBlog;
