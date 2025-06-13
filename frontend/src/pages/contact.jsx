

import React from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Contact = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const dateValue = form.formDate.value; 

    const formData = {
      name: form.formName.value,
      email: form.formEmail.value,
      phone: form.formPhone.value || '',
      date: dateValue, 
      feedbackType: form.formFeedbackType.value,
      rating: Number(form.formRating.value),
      subject: form.formSubject.value,
      message: form.formMessage.value,
      consent: form.formConsent.checked,
    };

    console.log('Submitting form data:', formData);

    try {
      const response = await axios.post('https://sports-vvki.onrender.com/feedback', formData, {
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      });

      console.log('Response:', response);

      if (response.status >= 200 && response.status < 300) {
        toast.success("Thank you for your feedback! We've received your message.", {
          position: "top-center",
          autoClose: 3000,
          theme: "colored",
        });
        form.reset(); 
      } else {
   
        throw new Error(`Server responded with status ${response.status}`);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      console.error('Error response data:', error.response?.data);
      console.error('Error response status:', error.response?.status);
      
      let errorMessage = "Failed to send feedback. Please try again later.";
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error(` ${errorMessage}`, {
        position: "top-center",
        autoClose: 5000, // Give more time for error messages
        theme: "colored",
      });
    }
  };

  return (
    <div className="bg-white text-light py-5">
      <Container>
        <Row className="mb-5 text-center">
          <Col>
            <h2 className="display-5 fw-bold text-warning">Post-Booking Feedback</h2>
            <p className="lead text-dark">Share your experience, suggestions, or any issues after your ground booking!</p>
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
                        <Form.Control name="formName" type="text" placeholder="Enter your full name" required />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email Address *</Form.Label>
                        <Form.Control name="formEmail" type="email" placeholder="Enter your email" required />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formPhone">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control name="formPhone" type="tel" placeholder="Enter your phone number" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formDate">
                        <Form.Label>Date of Booking *</Form.Label>
                        <Form.Control name="formDate" type="date" required />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formFeedbackType">
                        <Form.Label>Feedback Type *</Form.Label>
                        <Form.Select name="formFeedbackType" required>
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
                        <Form.Select name="formRating" required>
                          <option value="">Select rating</option>
                          <option value="5">Excellent</option>
                          <option value="4">Good</option>
                          <option value="3">Average</option>
                          <option value="2">Fair</option>
                          <option value="1">Poor</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3" controlId="formSubject">
                    <Form.Label>Subject *</Form.Label>
                    <Form.Control name="formSubject" type="text" placeholder="Enter subject of your feedback" required />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formMessage">
                    <Form.Label>Detailed Feedback / Issue *</Form.Label>
                    <Form.Control name="formMessage" as="textarea" rows={4} placeholder="Describe your experience or issue in detail" required />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formConsent">
                    <Form.Check name="formConsent" type="checkbox" label="I agree to be contacted regarding my feedback." required />
                  </Form.Group>

                  <div className="text-center">
                    <Button variant="warning" type="submit" className="fw-semibold px-5">
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