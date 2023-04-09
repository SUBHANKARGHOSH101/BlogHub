import React from "react";
import "../css/Modal.css";
import { db } from "../firebase-config";
import { deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Modal({ setOpenModal, blogs, blog, setBlogs }) {
  const navigate = useNavigate();
  const deletePost = async (id) => {
    const postDoc = doc(db, "blogposts", id);
    await deleteDoc(postDoc);
    setBlogs(blogs.filter((blog) => blog.id !== id));
    navigate("/home");
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="heading">
          <h4>Are You Sure You Want to Delete?</h4>
        </div>
        <div className="footer">
          <button
            className="delete"
            onClick={() => {
              deletePost(blog.id);
            }}
          >
            Delete
          </button>
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            className="cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
