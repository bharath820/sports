import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from "../Assetss/reviews/final-logo.jpg";

const CustomNavbar = () => {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userEmail = localStorage.getItem("userEmail");
  const username = userEmail ? userEmail.split('@')[0].toUpperCase() : '';

  const handleSignIn = () => navigate('/login');
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    navigate('/login');
  };
  const handleProfile = () => navigate('/profile');

  return (
    <>
      <Navbar  bg="dark"variant="dark" expand="lg" fixed="top" className="shadow-sm py-3">
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
            <img 
              src={Logo}
              alt="Logo"
              height="100"
              width="70"
              className="rounded-circle"
              style={{ objectFit: 'cover' }}
            />
            <span className="fw-bold text-warning">MANCHESTER</span>
            <span className="fw-light text-light">Sports Club</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav" />

          <Navbar.Collapse id="navbar-nav" >
           <Nav className="ms-auto align-items-center flex-column flex-sm-row gap-2 gap-lg-4 text-center text-lg-start width-600">

              <Nav.Link as={Link} to="/" className="text-uppercase fw-semibold text-light">Home</Nav.Link>
              <Nav.Link as={Link} to="/about" className="text-uppercase fw-semibold text-light">About</Nav.Link>
              <Nav.Link as={Link} to="/services" className="text-uppercase fw-semibold text-light">Services</Nav.Link>
              <Nav.Link as={Link} to="/contact" className="text-uppercase fw-semibold text-light">Contact</Nav.Link>

              {isLoggedIn ? (
                <>
                  <button
                    onClick={handleProfile}
                    className="btn btn-sm btn-outline-warning rounded-pill px-3 d-flex align-items-center"
                  >
                    <FaUser size={14} className="me-1" />
                    {username}
                  </button>
                  <button
                    onClick={handleLogout}
                    className="btn btn-sm btn-outline-light rounded-pill px-3 fw-semibold text-light"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={handleSignIn}
                  className="btn btn-sm btn-outline-warning rounded-pill px-3 fw-semibold"
                >
                  Login In
                </button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div style={{ paddingTop: '80px' }} />
    </>
  );
};

export default CustomNavbar;
