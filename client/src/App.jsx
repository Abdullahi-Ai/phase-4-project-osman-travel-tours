import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./AdminDashboard"; 
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homepage from "./components/Homepage";
import About from "./components/About";
import Blog from "./components/Blog";
import SafariPackages from "./components/SafariPackages";
import Contact from "./components/Contact";
import SignIn from "./components/SignIn";
import "./App.css";


export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    const userName = localStorage.getItem("user_name");
    const userEmail = localStorage.getItem("user_email");

    if (userId && userEmail) {
      setUser({
        id: parseInt(userId),
        name: userName || "",
        email: userEmail,
      });
    }
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/safari-packages" element={<SafariPackages user={user} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<SignIn setUser={setUser} />} />
        <Route path="/admin" element={<AdminDashboard user={user} />} />
      </Routes>
      <Footer />
    </Router>
  );
}
