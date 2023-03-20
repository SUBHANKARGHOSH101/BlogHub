import React from "react";
import { useEffect } from "react";
import "../css/About.css";

export const About = ({ isAuth }) => {
  useEffect(() => {
    if (!isAuth) {
      window.location.pathname = "/login";
    }
  }, []);

  return (
    <div className="about">
      <h1 className="Atitle">About</h1>
      <ul className="Adesc">
        <li>
          Blog Post is a new website that aims to provide a platform for writers
          and bloggers to share their thoughts, ideas, and experiences with the
          world. Our website is designed to be user-friendly and accessible,
          making it easy for anyone to create and publish their own blog
          posts.We understand the importance of storytelling, and how it can
          have a significant impact on people's lives.
        </li>
        <br></br>
        <li>
          User-friendly and accessible for anyone to create and publish posts.We
          understand that writing can be a solitary experience, which is why we
          have created a community of like-minded individuals who can connect
          with each other, share their experiences, and collaborate on projects
          together.
        </li>
        <br></br>
        <li>
          At Blog Post, we understand the power of storytelling and the impact
          it can have on people's lives.Values the power of storytelling and
          believes everyone has a story to tell.
        </li>
        <br></br>
        <li>
          Encourages collaboration and discussion to foster creativity and
          innovation.We believe that everyone has a story to tell, and our goal
          is to provide a platform that allows people to share their stories
          with a wider audience. Whether you're a seasoned writer or a
          first-time blogger, Blog Post is the perfect place to showcase your
          talents and connect with like-minded individuals.
        </li>
        <br></br>
        <li>
          Our website is a community-driven platform that encourages
          collaboration and discussion, helping to foster a sense of creativity
          and innovation among our users. We also believe that blogging can be a
          valuable tool for personal growth and development. By writing and
          sharing our thoughts and experiences, we can gain new insights into
          ourselves and the world around us, and connect with others who share
          our passions and interests.
        </li>
        <br></br>
        <li>
          Blog Post is a website that aims to empower people to share their
          stories and connect with others in a meaningful way. Whether you're
          looking to start your own blog, connect with other writers, or simply
          explore new ideas and perspectives, we invite you to join our
          community and be a part of the conversation.
        </li>
      </ul>
    </div>
  );
};
