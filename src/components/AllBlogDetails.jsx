import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import "../css/AllBlogDetails.css";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import ReactMarkdown from "react-markdown";

const AllBlogDetails = ({ setBlogs }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [blog, setBlog] = useState({});

  async function fetchDoc() {
    const docSnap = await getDoc(doc(db, "blogposts", id));
    if (docSnap.exists()) {
      setBlog(docSnap.data());
      setLoading(false);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchDoc();
  }, [user]);

  function updatelikes() {
    if (!blog.likes.includes(user?.email)) {
      updateDoc(doc(db, "blogposts", id), {
        likes: arrayUnion(user?.email),
      });

      setBlog((prev) => ({ ...prev, likes: [...prev.likes, user?.email] }));
      setBlogs((prev) => {
        return prev.map((eachDoc) => {
          if (eachDoc.id == id) {
            return { ...eachDoc, likes: [...eachDoc.likes, user?.email] };
          }
          return eachDoc;
        });
      });
    } else {
      updateDoc(doc(db, "blogposts", id), {
        likes: arrayRemove(user?.email),
      });

      setBlog((prev) => ({
        ...prev,
        likes: prev.likes.filter((email) => email != user?.email),
      }));
      setBlogs((prev) => {
        return prev.map((eachDoc) => {
          if (eachDoc.id == id) {
            return {
              ...eachDoc,
              likes: eachDoc.likes.filter((email) => email != user?.email),
            };
          }
          return eachDoc;
        });
      });
    }
    console.log(blog.likes.includes(user?.email));
  }

  const pressback1 = () => {
    navigate("/blogs");
  };

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
            <div className="back-position">
              <button className="tags1" onClick={pressback1}>
                Back
              </button>
            </div>
            <div>
              <button
                className="a"
                onClick={() => {
                  updatelikes();
                }}
              >
                {blog.likes.includes(user?.email) ? "❤️" : "🤍"}
              </button>
            </div>
          </div>
          <div>
            <article>
              <h2 className="allblogtitle">{blog.title}</h2>
              <p>likes:{blog.likes.length}</p>
              <p className="writtenby">Written by {blog.author}</p>
              <ReactMarkdown className="finalview">
                {blog.postText}
              </ReactMarkdown>
            </article>
          </div>
        </>
      )}
    </div>
  );
};

export default AllBlogDetails;
