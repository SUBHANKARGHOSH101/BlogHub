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
// import { Landing } from "./components/Landing";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useLocation } from "react-router-dom";
function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [blogs, setBlogs] = useState([]);
  const [currentPath, setCurrentPath] = useState("/");
  const postsCollection = collection(db, "blogposts");
  const [user] = useAuthState(auth); // add loading state
  const [showLoading, setShowLoading] = useState(true); // add showLoading state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getPosts = async () => {
    const data = await getDocs(postsCollection);
    setBlogs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getPosts();
  }, []);

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/login");
  //   } else {
  //     navigate("/");
  //   }
  // }, [user, blogs]);

  useEffect(() => {
    if (user) {
      setShowLoading(false);
      if (localStorage.getItem(currentPath)) {
        navigate(localStorage.getItem(currentPath));
      } else {
        navigate("/");
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  const signUserOut = () => {
    signOut(auth);
    localStorage.clear();
    localStorage.setItem(currentPath, "/");
    navigate("/login");
  };
  return (
    <div className="App">
      {/* <Router> */}
      <nav className="navbar">
        <h1 className="blogpost">BlogPost</h1>
        <h1 className="shortblogpost">BP</h1>
        {!user ? (
          <Link to="/login" className="tags">
            Login
          </Link>
        ) : (
          <>
            <div className="links">
              <Link to="/" className="tags">
                Home
              </Link>
              <Link to="/blogs" className="tags">
                Blogs
              </Link>
              <Link to="/create" className="tags">
                Create
              </Link>
              <Link to="/about" className="tags">
                About
              </Link>
              <a href="" className="tags" onClick={signUserOut}>
                LogOut
              </a>
            </div>
          </>
        )}
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              blogs={blogs.filter((blog) => blog.user_id === user?.email)}
            />
          }
        />
        <Route
          path="/blogs"
          element={
            <Blogs
              blogs={blogs.filter((blog) => blog.user_id != user?.email)}
              title="All Blogs"
            />
          }
        />
        <Route path="/create" element={<NewBlog />} />
        <Route
          path="/about"
          element={
            <About currentPath={currentPath} setCurrentPath={setCurrentPath} />
          }
        />
        <Route path="/login" element={<Login />} />

        <Route
          path="/blogdetails/:id"
          element={<BlogDetail blogs={blogs} setBlogs={setBlogs} />}
        />
        <Route
          path="/blogs/allblogdetails/:id"
          element={<AllBlogDetails blogs={blogs} />}
        />
        {/* <Route path="/landing" element={<Landing />} /> */}
      </Routes>
      {/* </Router> */}
    </div>
  );
}

export default App;
