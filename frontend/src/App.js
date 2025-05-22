import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Home from "./components/Home.jsx";
import About from "./pages/About.jsx";
import Service from "./pages/Services.jsx";
import Book from "./pages/book.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/footer.jsx";
import Contact from "./pages/contact.jsx";
import Land from "./Landpage/Landpage.jsx";
import Register from "./Landpage/Register.jsx";
import Login from "./Landpage/Login.jsx";
import Profile from "./pages/Profile.jsx";


import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51RJBcV2SU9vnUGmhtxUrgYl5vnvL2wjkxdMu3Pm5AvG03oU8asYJT6FsQRhA4btjXYA7nfgrTFJlWtAw0F76w9qk003JSEt1QC");

const Layout = () => {
  const location = useLocation();
  const hideLayoutRoutes = ['/login', '/register'];
  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname.toLowerCase());

  return (
    <>
      {!shouldHideLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<div className="pt-5"><Home /></div>} />
        <Route path="/about" element={<div className="pt-5"><About /></div>} />
        <Route path="/services" element={<div className="pt-5"><Service /></div>} />
        <Route path="/book" element={<div className="pt-5"><Book /></div>} />
        <Route path="/contact" element={<div className="pt-5"><Contact /></div>} />
        <Route path="/land" element={<div className="pt-5"><Land /></div>} />
        <Route path="/register" element={<div className="pt-5"><Register /></div>} />
        <Route path="/login" element={<div className="pt-5"><Login /></div>} />
        <Route path="/profile" element={<div className="pt-5"><Profile /></div>} />
      </Routes>
      {!shouldHideLayout && <Footer />}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
