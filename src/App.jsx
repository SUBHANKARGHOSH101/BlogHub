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
import { BlogEdit } from "./components/BlogEdit";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "./firebase-config";
import Landing from "./components/Landing";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";

function App() {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [currentPath, setCurrentPath] = useState("/");
  const postsCollection = collection(db, "blogposts");
  const [user, loading] = useAuthState(auth); // add loading state
  console.log(user);
  console.log(loading);
  const [showLanding, setShowLanding] = useState(true);

  const getPosts = async () => {
    const data = await getDocs(postsCollection);
    setBlogs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    if (!loading) {
      // check if loading is done
      if (user) {
        navigate("/home");
      } else {
        navigate("/");
      }
    }
  }, [loading, user]);

  useEffect(() => {
    if (user || !showLanding) {
      setShowLanding(false);
    }
  }, [user]);

  const handleLogin = () => {
    setShowLanding(false);
    navigate("/login");
  };

  const signUserOut = () => {
    signOut(auth);
    navigate("/");
  };

  if (loading) {
    // show loading screen if still loading
    return (
      <div className="loading-screen">
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
    <div className="App">
      {/* <Router> */}
      {showLanding ? (
        <Landing onLogin={handleLogin} user={user} />
      ) : (
        <>
          <nav className="navbar">
            <h1 className="blogpost">BlogPost</h1>
            <h1 className="shortblogpost">BP</h1>
            {!user ? (
              <div className="logintags">
                <Link to="/login" className="tags">
                  Login
                </Link>
              </div>
            ) : (
              <>
                <div className="links">
                  <Link to="/home" className="tags">
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
              path="/home"
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
                <About
                  currentPath={currentPath}
                  setCurrentPath={setCurrentPath}
                />
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
            <Route
              path="/blogdetails/edit/:id"
              element={<BlogEdit blogs={blogs} setBlogs={setBlogs} />}
            />
          </Routes>
        </>
      )}
      {/* </Router> */}
    </div>
  );
}

export default App;
