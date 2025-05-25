import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // ✅ useNavigate added
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const BookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate(); // ✅ Initialize navigate

  const { ground, selectedDate, selectedSlot, sport, selectedSport } = location.state || {};

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const resolvedSport = ground?.sport || selectedSport || sport || "N/A";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !username) {
      toast.warn("Please fill in all fields.", { position: "top-center" });
      return;
    }

    setSubmitting(true);

    try {
      // 1. Send email
      await axios.post("http://localhost:3001/send-email", {
        email,
        username,
        groundName: ground?.name,
        sport: resolvedSport,
        date: new Date(selectedDate).toDateString(),
        slot: selectedSlot,
      });

      // 2. Store booking in MongoDB
      await axios.post("http://localhost:3001/booking", {
        email,
        username,
        groundName: ground?.name,
        sport: resolvedSport,
        date: new Date(selectedDate),
        slot: selectedSlot,
        bookedAt: new Date(),
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      toast.success("✅ Thank you for booking! Confirmation email sent.", {
        position: "top-center",
        autoClose: 2000, // ✅ Optional: Close after 2 seconds
        onClose: () => navigate("/") // ✅ Navigate to home after toast
      });

      setEmail("");
      setUsername("");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to process booking. Please try again.", { position: "top-center" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container my-5">
      <ToastContainer />
      <h3 className="mb-4 fw-bold text-dark text-center">Booking Confirmation</h3>

      <form onSubmit={handleSubmit} className="card p-4 shadow border-0 rounded-4 bg-light">
        <div className="mb-3">
          <label className="form-label fw-semibold">Your Name</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Email Address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Selected Ground</label>
          <input type="text" className="form-control" value={ground?.name || "N/A"} disabled />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Sport</label>
          <input type="text" className="form-control" value={resolvedSport} disabled />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Date</label>
          <input type="text" className="form-control" value={new Date(selectedDate).toDateString()} disabled />
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">Slot</label>
          <input type="text" className="form-control" value={selectedSlot || "N/A"} disabled />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-dark mt-4 px-4 py-2" disabled={submitting}>
            {submitting ? "Sending..." : "Confirm Booking"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
