import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from "../Assetss/main logo.png";

const CustomNavbar = () => {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userEmail = localStorage.getItem("userEmail");
  const username = userEmail ? userEmail.split('@')[0].toUpperCase() : '';

  const handleSignIn = () => navigate('/login');
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    navigate('/');
  };
  const handleProfile = () => navigate('/profile');

  return (
    <>
      <Navbar bg="white" variant="dark" expand="lg" fixed="top" className="shadow-sm py-3">
        <Container className="d-flex align-items-center">
          {/* Brand */}
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
            <img 
              src={Logo}
              alt="Logo"
              height="100"
              width="100"
              className="rounded-circle"
              style={{ objectFit: 'cover' }}
            />
            <span className="fw-bold text-warning">MANCHESTER</span>
            <span className="fw-light text-dark">Sports Club</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav" className="border-0" />

          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto align-items-center gap-3">
              <Nav.Link as={Link} to="/" className="text-uppercase fw-semibold text-dark">Home</Nav.Link>
              <Nav.Link as={Link} to="/about" className="text-uppercase fw-semibold text-dark">About</Nav.Link>
              <Nav.Link as={Link} to="/services" className="text-uppercase fw-semibold text-dark">Services</Nav.Link>
              <Nav.Link as={Link} to="/contact" className="text-uppercase fw-semibold text-dark">Contact</Nav.Link>

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
                    className="btn btn-sm btn-outline-dark rounded-pill px-3 fw-semibold text-dark"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={handleSignIn}
                  className="btn btn-sm btn-outline-warning rounded-pill px-3 fw-semibold"
                >
                  Sign In
                </button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Offset to avoid overlap due to fixed top */}
      <div style={{ paddingTop: '65px' }} />
    </>
  );
};

export default CustomNavbar;
