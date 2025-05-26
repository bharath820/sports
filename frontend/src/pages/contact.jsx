import React from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Contact = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.formName.value,
      email: e.target.formEmail.value,
      phone: e.target.formPhone.value || 'Not provided',
      date: e.target.formDate.value,
      feedbackType: e.target.formFeedbackType.value,
      rating: e.target.formRating.value,
      subject: e.target.formSubject.value,
      message: e.target.formMessage.value,
      consent: e.target.formConsent.checked,
    };

    try {
      const response = await axios.post('https://sports-vvki.onrender.com/feedback', formData);
      
      toast.success("🎉 Thank you for your feedback! We've received your message.", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
      e.target.reset();
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error("❌ Failed to send feedback. Please try again later.", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  return (
    <div className="bg-dark text-light py-5">
      <Container>
        <Row className="mb-5 text-center">
          <Col>
            <h2 className="display-5 fw-bold text-warning">Post-Booking Feedback</h2>
            <p className="lead">Share your experience, suggestions, or any issues after your ground booking!</p>
          </Col>
        </Row>

        <Row className="g-4 justify-content-center">
          <Col md={8}>
            <Card className="bg-light text-dark border-0 shadow">
              <Card.Body>
                <h4 className="mb-4 text-center">Feedback Form</h4>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Full Name *</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="Enter your full name" 
                          required 
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email Address *</Form.Label>
                        <Form.Control 
                          type="email" 
                          placeholder="Enter your email" 
                          required 
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formPhone">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control 
                          type="tel" 
                          placeholder="Enter your phone number" 
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formDate">
                        <Form.Label>Date of Booking *</Form.Label>
                        <Form.Control 
                          type="date" 
                          required 
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formFeedbackType">
                        <Form.Label>Feedback Type *</Form.Label>
                        <Form.Select required>
                          <option value="">Select feedback type</option>
                          <option value="Complaint">Complaint</option>
                          <option value="Suggestion">Suggestion</option>
                          <option value="Compliment">Compliment</option>
                          <option value="General Feedback">General Feedback</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formRating">
                        <Form.Label>Rating *</Form.Label>
                        <Form.Select required>
                          <option value="">Select rating</option>
                          <option value="5 - Excellent">Excellent</option>
                          <option value="4 - Good">Good</option>
                          <option value="3 - Average">Average</option>
                          <option value="2 - Fair">Fair</option>
                          <option value="1 - Poor">Poor</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3" controlId="formSubject">
                    <Form.Label>Subject *</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="Enter subject of your feedback" 
                      required 
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formMessage">
                    <Form.Label>Detailed Feedback / Issue *</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={4} 
                      placeholder="Describe your experience or issue in detail" 
                      required 
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formConsent">
                    <Form.Check 
                      type="checkbox" 
                      label="I agree to be contacted regarding my feedback."
                      required
                    />
                  </Form.Group>

                  <div className="text-center">
                    <Button 
                      variant="warning" 
                      type="submit" 
                      className="fw-semibold px-5"
                    >
                      Submit Feedback
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default Contact;