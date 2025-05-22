import React from "react";
import Landpageimg from "../Assetss/landpage.jpg"; // Make sure folder name is correct
import { Link } from "react-router-dom";

const Landpage = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100 text-white"
      style={{
        backgroundImage: `url(${Landpageimg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 1,
        }}
      />

      {/* Content box */}
      <div
        className="text-center p-5 rounded-4 shadow-lg"
        style={{
          position: "relative",
          zIndex: 2,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.2)",
          maxWidth: "700px",
          width: "90%",
        }}
      >
        <h1
          className="display-5 fw-bold text-uppercase mb-3"
          style={{ letterSpacing: "2px" }}
        >
          Manchester Sports Club
        </h1>
        <p className="lead mb-4">
          Discover premium sports arenas and book your favorite grounds with ease.
        </p>

        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <Link
            to="/login"
            className="btn btn-outline-light px-4 py-2 rounded-pill text-decoration-none"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="btn btn-light text-dark px-4 py-2 rounded-pill text-decoration-none"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landpage;
