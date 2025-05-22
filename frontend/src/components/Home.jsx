import React from "react";
import About from "../pages/content"
import Review from "../pages/reviews"
import Blog from "../pages/blog"

import Appoint from "../pages/Apointment"


const Home = () => {
  return (
    <div className="home-container">
      <About />
      <Blog />
      <Review />
      <Appoint />
      {/* Add any other components or sections you want to include in the home page */}
    </div>
  );
};

export default Home;
