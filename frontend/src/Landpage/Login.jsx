import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // ✅ Import Toastify
import 'react-toastify/dist/ReactToastify.css';          // ✅ Import Toastify CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import Api_url from '../config/config.js'

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

const handleLogin = async () => {
  if (!email || !password) {
    toast.error("Email and password are required.");
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    toast.error("Please enter a valid email address.");
    return;
  }

  setIsLoading(true);
  setError("");

  try {
    const response = await fetch(`${Api_url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }), // ✅ Correct for POST
    });

    const data = await response.json();

    if (response.ok && data.success) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      toast.success("Login successful!");

      const from = location.state?.from || "/";
      setTimeout(() => {
        navigate(from);
      }, 1500);
    } else {
      toast.error(data.message || "Invalid email or password");
    }
  } catch (error) {
    toast.error("An error occurred while logging in. Please try again.");
  }

  setIsLoading(false);
};

const handleAdminLogin = async () => {
}

const handleLoginGuest = async () => {
  const guestEmail = "bharath@gmail.com"; // Replace with your actual guest email
  const guestPassword = "123456";       // Replace with your actual guest password

  setIsLoading(true);
  setError("");

  try {
    const response = await fetch(`${Api_url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: guestEmail, password: guestPassword }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", guestEmail);
      toast.success("Guest login successful!");

      const from = location.state?.from || "/";
      setTimeout(() => {
        navigate(from);
      }, 1500);
    } else {
      toast.error(data.message || "Guest login failed.");
    }
  } catch (error) {
    toast.error("An error occurred during guest login. Please try again.");
  }

  setIsLoading(false);
};


  return (
    <div className="container-fluid d-flex justify-content-center align-items-center bg-dark" style={{ minHeight: "100vh" }}>
      <div className="card shadow-lg p-4" style={{ width: '400px', backgroundColor: '#ffffff' }}>
        <h2 className="text-center mb-4 text-dark">Login</h2>
        
        <div className="form-group mb-3">
          <label className="text-dark">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label className="text-dark">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          onClick={handleLogin}
          className="btn btn-dark btn-block w-100"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        
        <button onClick={handleAdminLogin}
        className="btn btn-dark btn-block w-100" 
        disabled={isLoading}
        >

        </button>

        <div className="mt-3 text-center">
          <p className="text-dark">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
        <div className="mt-2 text-center">
          <button onClick={handleLoginGuest} className="btn btn-outline-secondary w-100">Login asGuest</button>
        </div>
      </div>

      <ToastContainer position="top-center" /> {/* ✅ Add ToastContainer */}
    </div>
  );
};

export default Login;
