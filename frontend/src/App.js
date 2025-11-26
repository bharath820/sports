import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Home from "./components/Home.jsx";
import About from "./pages/About.jsx";
import Service from "./pages/Services.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/footer.jsx";
import Contact from "./pages/contact.jsx";
import Land from "./Landpage/Landpage.jsx";
import Register from "./Landpage/Register.jsx";
import Login from "./Landpage/Login.jsx";
import Profile from "./pages/Profile.jsx";
import Dashboard from "./pages/dashboard.jsx"
import Grounddetails from "./pages/grounddetails.jsx"
import BookingForm from "./pages/form.jsx"
import Logins from './Landpage/Login.jsx';





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
        <Route path="/contact" element={<div className="pt-5"><Contact /></div>} />
        <Route path="/land" element={<div className="pt-5"><Land /></div>} />
        <Route path="/register" element={<div className="pt-5"><Register /></div>} />
        <Route path="/login" element={<div className="pt-5"><Login /></div>} />
        <Route path="/profile" element={<div className="pt-5"><Profile /></div>} />
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/ground/:id" element={<Grounddetails />} />
         <Route path="/form" element={<BookingForm />}/>
         <Route path="/login" element={<Logins />} />
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
