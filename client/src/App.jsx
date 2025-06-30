import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import AdminDashboard from "./AdminDashboard";
import AdminTours from "./components/AdminTours"; 
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homepage from "./components/Homepage";
import About from "./components/About";
import Blog from "./components/Blog";
import SafariPackages from "./components/SafariPackages";
import Contact from "./components/Contact";
import SignIn from "./components/SignIn";
import ViewBookings from "./components/ViewBookings";

import "./App.css";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const response = await fetch("/me", {
          credentials: "include",
        });

        if (response.ok) {
          const userData = await response.json();
          setUser({
            id: userData.id,
            name: userData.name,
            email: userData.email,
            is_admin: userData.is_admin,
          });


          localStorage.setItem("user_id", userData.id);
          localStorage.setItem("user_name", userData.name);
          localStorage.setItem("user_email", userData.email);
          localStorage.setItem("is_admin", userData.is_admin);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
        setUser(null);
      }
    }

    fetchCurrentUser();
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

    
        <Route
          path="/signin"
          element={user ? <Navigate to="/" replace /> : <SignIn setUser={setUser} />}
        />

        <Route
          path="/admin/tours"
          element={
            user?.is_admin ? (
              <AdminTours user={user} />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />


        <Route
          path="/bookings"
          element={
            user?.is_admin ? (
              <ViewBookings user={user} />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />

   
        <Route path="*" element={<h2 style={{ padding: "2rem" }}>404 - Page Not Found</h2>} />
      </Routes>

      <Footer />
    </Router>
  );
}
