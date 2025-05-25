import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify"; // import Toastify
import "react-toastify/dist/ReactToastify.css"; // import Toastify styles

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    const { name, email, password } = formData;

    if (!name || !email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("https://sports-vvki.onrender.com/user", {
        name,
        email,
        password,
      });

      if (response.data.success) {
        toast.success("Registration successful!");
        setTimeout(() => navigate("/login"), 2000); // Navigate after showing success
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Something went wrong.";
      toast.error(message);
      console.error("Registration failed:", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center bg-dark min-vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%", backgroundColor: "#ffffff" }}>
        <h3 className="text-center mb-4 text-dark">Register</h3>

        <div className="mb-3">
          <label className="form-label text-dark">Full Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-dark">Email address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-dark">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter a password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          className="btn btn-dark w-100"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
        <p className="text-dark">
    Already have an account?{" "}
    <span
      onClick={() => navigate("/login")}
      style={{ color: "#007bff", cursor: "pointer", textDecoration: "underline" }}
    >
      Back to Login
    </span>
  </p>

      </div>

      {/* ToastContainer should be inside the component tree */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Register;
