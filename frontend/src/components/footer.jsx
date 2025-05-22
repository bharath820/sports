import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-4 pb-3 mt-5">
      <div className="container text-center text-md-left">
        <div className="row">
          <div className="col-md-6 mb-3">
            <h5>About GroundBooking</h5>
            <p>
              GroundBooking is your one-stop platform for reserving sports grounds across the city.
              Enjoy easy scheduling, instant confirmations, and the best venues at your fingertips.
            </p>
          </div>
          <div className="col-md-3 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light text-decoration-none">Home</a></li>
              <li><a href="/" className="text-light text-decoration-none">Book a Ground</a></li>
              <li><a href="/" className="text-light text-decoration-none">Reviews</a></li>
              <li><a href="/" className="text-light text-decoration-none">Contact</a></li>
            </ul>
          </div>
          <div className="col-md-3 mb-3">
            <h5>Contact Us</h5>
            <p>Email: support@groundbooking.com</p>
            <p>Phone: +91 98765 43210</p>
          </div>
        </div>
        <hr className="border-secondary" />
        <div className="text-center">
          <p className="mb-0">© {new Date().getFullYear()} GroundBooking. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
