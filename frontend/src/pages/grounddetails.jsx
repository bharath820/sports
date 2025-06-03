import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Carousel, Button, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import { Calendar, Star, Clock } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";

const GroundDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const groundFromNav = location.state?.ground;
  const { sport, selectedSport } = location.state || {};
  const [ground, setGround] = useState(groundFromNav || null);
  const [loading, setLoading] = useState(!groundFromNav);
  const [error, setError] = useState(null);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const getNext7Days = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      days.push(d);
    }
    return days;
  };

  const [next7Days] = useState(getNext7Days());

  useEffect(() => {
    if (!groundFromNav) {
      axios
        .get(`https://sports-vvki.onrender.com/ground/${id}`)
        .then((res) => setGround(res.data.data))
        .catch(() => setError("Failed to load ground details."))
        .finally(() => setLoading(false));
    }
  }, [id, groundFromNav]);

  const handleBookNow = () => {
    if (!selectedSlot) {
      toast.warning("Please select a time slot");
      return;
    }

    const selectedDate = next7Days[selectedDateIndex];
    
    navigate("/form", {
      state: {
        ground,
        selectedDate,
        selectedSlot,
        selectedSport: selectedSport || ground?.sport || "Not specified"
      }
    });
  };

  const formatDay = (date) => date.toLocaleDateString("en-US", { weekday: "short" });
  const formatDateNum = (date) => date.getDate();

  const isSlotInPast = (slot, selectedDate) => {
    const now = new Date();
    const [time, modifier] = slot.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    const slotDate = new Date(selectedDate);
    slotDate.setHours(hours, minutes || 0, 0, 0);

    return slotDate < now;
  };

  if (loading) return <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>;
  if (error) return <Alert variant="danger" className="text-center py-5">{error}</Alert>;
  if (!ground) return <Alert variant="warning" className="text-center py-5">Ground data not found.</Alert>;

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 fw-bold text-dark">{ground.name}</h2>
      <p className="d-inline-flex align-items-center gap-2 px-3 py-2 mb-3 rounded-pill bg-light text-dark shadow-sm">
        <span className="fw-semibold">Sport:</span>
        <span className="text-dark">{selectedSport || ground?.sport || "Not specified"}</span>
      </p>

      <Row>
        <Col md={6} className="mb-4">
          {ground.images?.length > 0 ? (
            <Carousel fade className="rounded shadow-sm border">
              {ground.images.map((img, idx) => (
                <Carousel.Item key={idx}>
                  <img
                    src={img}
                    alt={`Slide ${idx}`}
                    className="w-100 rounded"
                    style={{ height: "420px", objectFit: "cover" }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <div className="text-muted text-center py-5 bg-light rounded">No images available.</div>
          )}
        </Col>

        <Col md={6}>
          <Card className="mb-4 shadow-sm border-0 rounded-4">
            <Card.Body>
              <h5 className="d-flex align-items-center mb-3 text-dark fw-semibold">
                <Calendar size={20} className="me-2 text-dark" /> Description
              </h5>
              <p className="text-muted">{ground.info || "No description available."}</p>
            </Card.Body>
          </Card>

          <Card className="mb-4 shadow-sm border-0 rounded-4">
            <Card.Body>
              <h5 className="mb-3 fw-semibold text-dark">Select Date</h5>
              <div className="d-flex gap-2 flex-wrap">
                {next7Days.map((date, idx) => (
                  <Button
                    key={idx}
                    variant={idx === selectedDateIndex ? "dark" : "outline-dark"}
                    onClick={() => {
                      setSelectedDateIndex(idx);
                      setSelectedSlot(null);
                    }}
                    className="rounded-pill px-3 py-2 text-center d-flex flex-column align-items-center"
                    style={{ minWidth: "52px", fontSize: "0.85rem" }}
                  >
                    <small className="text-uppercase fw-medium">{formatDay(date)}</small>
                    <strong className="fs-5">{formatDateNum(date)}</strong>
                  </Button>
                ))}
              </div>
            </Card.Body>
          </Card>

          <Card className="mb-4 shadow-sm border-0 rounded-4">
            <Card.Body>
              <h5 className="d-flex align-items-center mb-3 text-dark fw-semibold">
                <Clock size={20} className="me-2 text-dark" /> Available Slots
              </h5>
              {ground.slots?.length > 0 ? (
                <div className="d-flex flex-wrap gap-2">
                  {ground.slots.map((slot, idx) => {
                    const selectedDate = next7Days[selectedDateIndex];
                    const isPast = isSlotInPast(slot, selectedDate);
                    const isSelected = selectedSlot === slot;

                    return (
                      <span
                        key={idx}
                        onClick={() => !isPast && setSelectedSlot(slot)}
                        className={`badge rounded-pill px-3 py-2 fw-medium shadow-sm text-white ${
                          isPast ? "bg-secondary opacity-50" :
                          isSelected ? "bg-dark" : "bg-secondary"
                        }`}
                        style={{
                          fontSize: "0.85rem",
                          cursor: isPast ? "not-allowed" : "pointer",
                          pointerEvents: isPast ? "none" : "auto"
                        }}
                      >
                        {slot}
                      </span>
                    );
                  })}
                </div>
              ) : (
                <p className="text-muted mb-0">No slots available.</p>
              )}
            </Card.Body>
          </Card>

          <div className="d-flex justify-content-center">
            <button
              className="btn btn-dark mt-4 px-4 py-2"
              onClick={handleBookNow}
              disabled={!selectedSlot}
              style={{
                opacity: !selectedSlot ? 0.6 : 1,
                cursor: !selectedSlot ? "not-allowed" : "pointer",
              }}
            >
              Book Now
            </button>
          </div>
        </Col>
      </Row>

      <Card className="mt-5 shadow-sm border-0 rounded-4">
        <Card.Body>
          <h5 className="mb-4 d-flex align-items-center text-dark fw-semibold">
            <Star size={20} className="me-2 text-warning" /> User Reviews
          </h5>
          {ground.reviews?.length > 0 ? (
            <Row className="g-3">
              {ground.reviews.map((review, idx) => (
                <Col md={6} key={idx}>
                  <Card className="h-100 shadow-sm border-0 rounded-4 p-3 bg-light">
                    <div className="d-flex align-items-start gap-3 mb-2">
                      {review.userphoto ? (
                        <img
                          src={review.userphoto}
                          alt={`Review by ${review.user || "User"}`}
                          className="rounded-circle border"
                          style={{ width: "60px", height: "60px", objectFit: "cover" }}
                        />
                      ) : (
                        <div
                          className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center fw-bold"
                          style={{ width: "60px", height: "60px", fontSize: "1.25rem" }}
                        >
                          {review.user?.[0]?.toUpperCase() || "U"}
                        </div>
                      )}
                      <div className="flex-grow-1">
                        <h6 className="mb-1 fw-semibold text-dark">{review.review}</h6>
                        <div className="text-warning mb-2 fs-6">
                          {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                        </div>
                        <p className="text-muted small mb-0" style={{ lineHeight: 1.5 }}>
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <p className="text-muted fst-italic">No reviews available.</p>
          )}
        </Card.Body>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default GroundDetails;