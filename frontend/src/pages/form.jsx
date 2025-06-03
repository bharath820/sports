import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Redirect if state is missing
    if (!state || !state.ground || !state.selectedDate || !state.selectedSlot) {
      toast.error("Invalid booking details. Redirecting...");
      navigate("/");
    }
  }, [state, navigate]);

  if (!state) return null; // Prevent render before redirect

  const { ground, selectedDate, selectedSlot, selectedSport } = state;
  const resolvedSport = selectedSport || ground?.sport || "N/A";

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email || !username) {
    toast.warn("Please fill in all fields.", { position: "top-center" });
    return;
  }
 
  setSubmitting(true);

  const formattedDate = new Date(selectedDate).toDateString();
  const isoDate = new Date(selectedDate).toISOString();

  try {
    // Step 1: Send confirmation email
    const emailResponse = await axios.post("https://sports-vvki.onrender.com/send-email", {
      email,
      username,
      groundName: ground?.name,
      sport: resolvedSport,
      date: formattedDate,
      slot: selectedSlot,
    });

    if (emailResponse.status !== 200) {
      throw new Error("Failed to send confirmation email.");
    }

    // Step 2: Save booking in DB
    const bookingResponse = await axios.post(
      "https://sports-vvki.onrender.com/booking",
      {
        email,
        username,
        groundName: ground?.name,
        sport: resolvedSport,
        date: isoDate,
        slot: selectedSlot,
        bookedAt: new Date().toISOString(),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (bookingResponse.status === 200 || bookingResponse.status === 201) {
      toast.success("✅ Booking successful! Confirmation email sent.", {
        position: "top-center",
        autoClose: 2000,
        onClose: () => navigate("/"),
      });
      setEmail("");
      setUsername("");
    } else {
      throw new Error("Booking failed. Please try again.");
    }
  } catch (err) {
    console.error("Error in booking:", err);
    toast.error(`❌ ${err.response?.data?.message || err.message}`, {
      position: "top-center",
    });
  } finally {
    setSubmitting(false);
  }
};


  return (
    <div className="container my-5">
      <ToastContainer />
      <h3 className="mb-4 fw-bold text-dark text-center">Booking Confirmation</h3>

      <form
        onSubmit={handleSubmit}
        className="card p-4 shadow border-0 rounded-4 bg-light"
      >
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
          <input
            type="text"
            className="form-control"
            value={ground?.name || "N/A"}
            disabled
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Sport</label>
          <input
            type="text"
            className="form-control"
            value={resolvedSport}
            disabled
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Date</label>
          <input
            type="text"
            className="form-control"
            value={
              selectedDate
                ? new Date(selectedDate).toLocaleDateString("en-GB", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "N/A"
            }
            disabled
          />
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">Slot</label>
          <input
            type="text"
            className="form-control"
            value={selectedSlot || "N/A"}
            disabled
          />
        </div>

        <div className="d-grid">
          <button
            type="submit"
            className="btn btn-dark mt-4 px-4 py-2"
            disabled={submitting}
          >
            {submitting ? "Sending..." : "Confirm Booking"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
