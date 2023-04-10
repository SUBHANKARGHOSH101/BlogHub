import React from "react";
// import { BlogList } from "./BlogList";
import { lazy, useState, useEffect } from "react";
import "../css/Home.css";
import PulseLoader from "react-spinners/PulseLoader";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { Suspense } from "react";

const BlogList = lazy(() => import("./BlogList"));

const Home = ({ blogs }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    if (blogs) {
      setLoading(true);
    }
  }, [blogs]);

  if (!loading) {
    return (
      <div className="blog-details">
        <PulseLoader
          className="loader"
          color={"#f1356d"}
          loading={!loading}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
          speedMultiplier={0.8}
        />
      </div>
    );
  }

  return (
    <div className="home">
      {
        <Suspense fallback={<div>Loading...</div>}>
          <BlogList blogs={blogs} title="My Blogs" />
        </Suspense>
      }
    </div>
  );
};

export default Home;

// export const Home = ({ blogs }) => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [user] = useAuthState(auth);
//   useEffect(() => {
//     if (!user) {
//       navigate("/login");
//     }
//   }, [user]);

//   useEffect(() => {
//     if (blogs) {
//       setLoading(true);
//     }
//   }, [blogs]);

//   if (!loading) {
//     return (
//       <div className="blog-details">
//         <PulseLoader
//           className="loader"
//           color={"#f1356d"}
//           loading={!loading}
//           size={20}
//           aria-label="Loading Spinner"
//           data-testid="loader"
//           speedMultiplier={0.8}
//         />
//       </div>
//     );
//   }

//   return (
//     <div className="home">{<BlogList blogs={blogs} title="My Blogs" />}</div>
//   );
// };
