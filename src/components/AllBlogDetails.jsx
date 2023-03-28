import React from "react";
import { useParams } from "react-router-dom";
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
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

export const AllBlogDetails = () => {
  const { id } = useParams();
  // const blog = blogs.find((blog) => blog.id === id);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [blog, setBlog] = useState({});
  // const [likesCount, setLikesCount] = useState(loading ? 0 : blog.likes.length);
  // const [liked, setLiked] = useState(false);
  // loading ? 0 : blog.likes.includes(user?.email)

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

  // useEffect(() => {
  //   if (!loading) {
  //     setLikesCount(blog.likes.length);
  //     setLiked(blog.likes.includes(user?.email));
  //   }
  // }, [loading]);

  function updatelikes() {
    if (!blog.likes.includes(user?.email)) {
      updateDoc(doc(db, "blogposts", id), {
        likes: arrayUnion(user?.email),
      });
      // setLikesCount((prev) => prev + 1);
      // setLiked(true);
      setBlog((prev) => ({ ...prev, likes: [...prev.likes, user?.email] }));
    } else {
      updateDoc(doc(db, "blogposts", id), {
        likes: arrayRemove(user?.email),
      });
      // setLikesCount((prev) => prev - 1);
      // setLiked(false);
      setBlog((prev) => ({
        ...prev,
        likes: prev.likes.filter((email) => email != user?.email),
      }));
    }
    console.log(blog.likes.includes(user?.email));
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
            <button
              className="a"
              onClick={() => {
                updatelikes();
              }}
            >
              {blog.likes.includes(user?.email) ? "❤️" : "🤍"}
            </button>
          </div>
          <div>
            <article>
              <h2 className="allblogtitle">{blog.title}</h2>
              <p>like:{blog.likes.length}</p>
              <p>Written by {blog.author}</p>
              <div>{blog.postText}</div>
            </article>
          </div>
        </>
      )}
    </div>
  );
};
