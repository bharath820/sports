import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const email = localStorage.getItem('userEmail');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`https://sports-vvki.onrender.com/profile/${email}`);
        setBookings(response.data.bookings || []);
      } catch (err) {
        console.error('Error fetching bookings:', err);
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchBookings();
    } else {
      setLoading(false);
    }
  }, [email]);

  if (loading) return <div className="container mt-5">Loading...</div>;

  if (!email) {
    return <div className="container mt-5">You are not logged in.</div>;
  }

  if (bookings.length === 0) {
    return <div className="container mt-5">You haven’t booked any sports yet.</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Your Bookings</h2>
      {bookings.map((booking, index) => (
        <div key={index} className="card mb-3 shadow-sm">
          <div className="card-body">
            <p><strong>Ground:</strong> {booking.groundName}</p>
            <p><strong>Sport:</strong> {booking.sport}</p>
            <p><strong>Date:</strong> {new Date(booking.date).toDateString()}</p>
            <p><strong>Slot:</strong> {booking.slot}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Profile;
