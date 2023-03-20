import "./App.css";
import { Home } from "./components//Home";
import { Login } from "./components/Login";
import { NewBlog } from "./components//NewBlog";
import { About } from "./components//About";
import { Blogs } from "./components//Blogs";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import { BlogDetail } from "./components//BlogDetail";
import { AllBlogDetails } from "./components/AllBlogDetails";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "./firebase-config";

function App() {
  const [blogs, setBlogs] = useState([]);
  const postsCollection = collection(db, "blogposts");
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const getPosts = async () => {
    const data = await getDocs(postsCollection);
    setBlogs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getPosts();
  }, []);

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };
  return (
    <div className="App">
      <Router>
        <nav className="navbar">
          <h1 className="blogpost">BlogPost</h1>
          <h1 className="shortblogpost">BP</h1>
          <div className="links">
            {!isAuth ? (
              <Link to="/login" className="a">
                Login
              </Link>
            ) : (
              <>
                <Link to="/" className="a">
                  Home
                </Link>
                <Link to="/blogs" className="a">
                  Blogs
                </Link>
                <Link to="/newblog" className="a">
                  Create
                </Link>
                <Link to="/about" className="a">
                  About
                </Link>

                <a href="" className="a" onClick={signUserOut}>
                  LogOut
                </a>
              </>
            )}
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home blogs={blogs} isAuth={isAuth} />} />
          <Route
            path="/blogs"
            element={<Blogs blogs={blogs} title="All Blogs" isAuth={isAuth} />}
          />
          <Route path="/newblog" element={<NewBlog isAuth={isAuth} />} />
          <Route path="/about" element={<About isAuth={isAuth} />} />
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />

          <Route
            path="/blog-details/:id"
            element={<BlogDetail blogs={blogs} isAuth={isAuth} />}
          />
          <Route
            path="/allblog-details/:id"
            element={<AllBlogDetails blogs={blogs} isAuth={isAuth} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
