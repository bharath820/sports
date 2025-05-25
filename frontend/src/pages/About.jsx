import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Img1 from "../Assetss/aboutimg.jpg";
import { useNavigate } from "react-router-dom";
 // Add this CSS file for hover effects

const About = () => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    const user = localStorage.getItem("user");
    if (user && user !== "null" && user !== "undefined") {
      navigate("/services");
    } else {
      navigate("/services");
    }
  };

  const features = [
    {
      title: "Facilities",
      description: "Our ground is equipped with high-quality turf, lighting, and seating to ensure a professional playing experience for athletes and spectators alike.",
    },
    {
      title: "Flexible Booking & Accessibility",
      description: "Enjoy easy online booking and flexible scheduling. Our location is accessible with ample parking and transport connectivity",
    },
    {
      title: "Maintenance",
      description: "We prioritize player safety with regular ground maintenance, clean amenities, and first-aid support always available",
    },
  ];

  return (
    <div>
      {/* About Content */}
      <section className="container py-5">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <img
              src={Img1}
              alt="About Sports"
              className="img-fluid rounded shadow-sm"
              style={{ objectFit: "cover", height: "100%", maxHeight: "400px", width: "100%" }}
            />
          </div>
          <div className="col-lg-6">
            <h2 className="fw-bold mb-3 text-dark">Making Sports Booking Effortless</h2>
            <p className="text-secondary mb-4">
              Book your favorite sports grounds in just a few clicks. From football to cricket, we offer seamless
              scheduling, instant payments, and real-time availability.
            </p>
            <ul className="list-unstyled">
              {[
                "Live Availability & Easy Booking",
                "Multiple Sports – One Platform",
                "Instant Payments & Secure Checkout",
                "Trusted by Thousands of Athletes",
              ].map((item, index) => (
                <li key={index} className="d-flex align-items-center mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <button className="btn btn-dark mt-4 px-4 py-2" onClick={handleBookingClick}>
              Book Now
            </button>
          </div>
        </div>
      </section>

    <section className="py-5 bg-white">
  <div className="container text-center">
    <h2 className="fw-bold text-light-blue mb-5">Why Choose Us</h2>
    <div className="row justify-content-center g-4">
      {features.map((feature, index) => (
        <div className="col-md-4" key={index}>
          <div className="why-card p-4 h-100 rounded shadow-sm text-center hover-effect">
            <h5 className="fw-semibold text-dark mb-3">{feature.title}:</h5>
            <p className="text-secondary">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Testimonial Section */}
      <section className="bg-light py-5">
        <div className="container">
          <h3 className="fw-bold text-center mb-4">What Our Users Say</h3>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card border-0 shadow-sm p-4">
                <p className="fs-5 fst-italic mb-3 text-muted">
                  "Booking through this platform has transformed my weekends. It's fast, easy, and super reliable!"
                </p>
                <footer className="blockquote-footer">
                  John Smith <cite title="Source Title">Weekend Warrior</cite>
                </footer>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
