import React from "react";
import { useState, useEffect, useRef } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import "../css/NewBlog.css";
// import PulseLoader from "react-spinners/PulseLoader";
import ReactMarkdown from "react-markdown";
import reactMarkdown from "react-markdown";

export const NewBlog = (props) => {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [loading, setLoading] = useState(true);
  const textareaRef = useRef(null);

  const postsCollection = collection(db, "blogposts");

  const createPost = async (e) => {
    e.preventDefault();
    await addDoc(postsCollection, {
      title: title,
      postText: postText,
      author: auth.currentUser.displayName,
      id: auth.currentUser.uid,
      user_id: auth.currentUser.email,
      likes: 0,
    });
    window.location.pathname = "/";
  };

  const handleHeadingClick = () => {
    const textarea = textareaRef.current;
    const selectionStart = textarea.selectionStart;
    const selectionEnd = textarea.selectionEnd;
    const selectedText = textarea.value.substring(selectionStart, selectionEnd);
    const modifiedText = `## ${selectedText}`;
    const newText = `${postText.substring(
      0,
      selectionStart
    )}${modifiedText}${postText.substring(selectionEnd)}`;
    setPostText(newText);
    textarea.focus();
    textarea.setSelectionRange(
      selectionStart,
      selectionStart + modifiedText.length
    );
  };

  const handleSubheadingClick = () => {
    const textarea = textareaRef.current;
    const selectionStart = textarea.selectionStart;
    const selectionEnd = textarea.selectionEnd;
    const selectedText = textarea.value.substring(selectionStart, selectionEnd);
    const modifiedText = `### ${selectedText}`;
    const newText = `${postText.substring(
      0,
      selectionStart
    )}${modifiedText}${postText.substring(selectionEnd)}`;
    setPostText(newText);
    textarea.focus();
    textarea.setSelectionRange(
      selectionStart,
      selectionStart + modifiedText.length
    );
  };

  useEffect(() => {
    if (!props.isAuth) {
      setTimeout((window.location.pathname = "/login"), 50000);
    }
  }, []);
  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form>
        <label>Blog title:</label>
        <input
          type="text"
          required
          className="textForArea"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog body:</label>
        <div>
          <button type="button" onClick={handleHeadingClick}>
            H
          </button>
          <button type="button" onClick={handleSubheadingClick}>
            S
          </button>
        </div>
        <textarea
          ref={textareaRef}
          className="textForArea"
          type="text"
          onChange={(e) => setPostText(e.target.value)}
          value={postText}
        >
          <ReactMarkdown>{postText}</ReactMarkdown>
        </textarea>
        <button onClick={createPost}>Add Blog</button>
      </form>
      <div>
        <h2>Preview</h2>
        <ReactMarkdown>{postText}</ReactMarkdown>
      </div>
    </div>
  );
};
