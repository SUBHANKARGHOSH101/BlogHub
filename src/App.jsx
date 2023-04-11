import "./App.css";
import React, { lazy, useState, useEffect, Suspense } from "react";
// import { Home } from "./components//Home";
// import Login from "./components/Login";
// import { NewBlog } from "./components//NewBlog";
// import About from "./components//About";
// import { Blogs } from "./components//Blogs";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
// import { BlogDetail } from "./components//BlogDetail";
// import { AllBlogDetails } from "./components/AllBlogDetails";
// import { BlogEdit } from "./components/BlogEdit";
import { Routes, Route, Link } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import { db } from "./firebase-config";
import Landing from "./components/Landing";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";

const About = lazy(() => import("./components//About"));
const Home = lazy(() => import("./components//Home"));
const Login = lazy(() => import("./components//Login"));
const AllBlogDetails = lazy(() => import("./components//AllBlogDetails"));
const BlogDetail = lazy(() => import("./components//BlogDetail"));
const BlogEdit = lazy(() => import("./components//BlogEdit"));
const Blogs = lazy(() => import("./components//Blogs"));
const NewBlog = lazy(() => import("./components//NewBlog"));

function App() {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [currentPath, setCurrentPath] = useState("/");
  const postsCollection = collection(db, "blogposts");
  const [user, loading] = useAuthState(auth);

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
      {showLanding ? (
        <Landing onLogin={handleLogin} user={user} />
      ) : (
        <>
          <nav className="navbar">
            <h1 className="blogpost">BlogHub</h1>
            <h1 className="shortblogpost">BH</h1>
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
                <Suspense
                  fallback={
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
                  }
                >
                  <Home
                    blogs={blogs.filter((blog) => blog.user_id === user?.email)}
                  />
                </Suspense>
              }
            />
            <Route
              path="/blogs"
              element={
                <Suspense
                  fallback={
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
                  }
                >
                  <Blogs
                    blogs={blogs.filter((blog) => blog.user_id != user?.email)}
                    title="All Blogs"
                  />
                </Suspense>
              }
            />
            <Route
              path="/create"
              element={
                <Suspense
                  fallback={
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
                  }
                >
                  <NewBlog
                    setBlogs={setBlogs}
                    blogs={blogs.filter((blog) => blog.user_id === user?.email)}
                  />
                </Suspense>
              }
            />
            <Route
              path="/about"
              element={
                <Suspense
                  fallback={
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
                  }
                >
                  <About
                    currentPath={currentPath}
                    setCurrentPath={setCurrentPath}
                  />
                </Suspense>
              }
            />
            <Route
              path="/login"
              element={
                <Suspense
                  fallback={
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
                  }
                >
                  <Login />
                </Suspense>
              }
            />

            <Route
              path="/blogdetails/:id"
              element={
                <Suspense
                  fallback={
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
                  }
                >
                  <BlogDetail blogs={blogs} setBlogs={setBlogs} />
                </Suspense>
              }
            />
            <Route
              path="/blogs/allblogdetails/:id"
              element={
                <Suspense
                  fallback={
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
                  }
                >
                  <AllBlogDetails blogs={blogs} setBlogs={setBlogs} />
                </Suspense>
              }
            />
            <Route
              path="/blogdetails/edit/:id"
              element={
                <Suspense
                  fallback={
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
                  }
                >
                  <BlogEdit blogs={blogs} setBlogs={setBlogs} />
                </Suspense>
              }
            />
            <Route exact path="/" component={Landing} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
