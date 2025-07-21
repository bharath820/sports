#  Sport Ground Booking and Management System

A full-stack web application that allows users to browse, select, and book sports grounds online. The system supports user authentication, displays available slots dynamically, and provides booking confirmation via email.

##  Tech Stack

### Frontend
- **React.js**
- **Bootstrap** (for styling)
- **React Router** (for navigation)
- **Axios** (for API requests)

### Backend
- **Node.js**
- **Express.js**
- **MongoDB** (Mongoose for ODM)
- **JWT** (for user authentication)
- **Nodemailer** (for booking confirmation emails)

---

## ✨ Features

### 🔐 Authentication
- User **Registration** and **Login** functionality using **JWT**
- Secure routes for authenticated users only

### 📚 Sports and Grounds Management
- Different sports are listed (e.g., Cricket, Football, Tennis)
- Each sport has **multiple grounds** with detailed information
- Users can filter by **sport** and **ground**

### 📅 Booking System
- Users can:
  - View **7-day calendar**
  - Select a **date** and **time slot**
  - See only **upcoming 7 days**
  - Past dates are **automatically removed** from display

### 📝 Booking Form
- After slot selection, users are navigated to a **form page**
- Form shows:
  - **Pre-filled ground name**
  - **Selected date and time**
- Users fill in their **basic details** (name, contact, etc.)
- Upon submission:
  - Booking is saved to **MongoDB**
  - Confirmation **email is sent** via **Nodemailer**



