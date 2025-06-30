import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); 
    setUser(null);
    navigate("/signin");
  };

  return (
    <nav className="navbar">
      <h2 className="navbar-logo">Osman Travel Tours</h2>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/blog">Blog</Link></li>
        <li><Link to="/safari-packages">Safari Packages</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        


        {user?.is_admin && (
          <>
            <li><Link to="/admin/tours">Admin Dashboard</Link></li>
            <li><Link to="/bookings">View Bookings</Link></li>
          </>
        )}

        {user ? (
          <>
            <li>
              <span style={{ fontWeight: "bold", color: "#fff" }}>
                Hi, {user.name || "User"}
              </span>
            </li>
            <li>
              <button className="logout-btn" onClick={handleLogout}>
                Sign Out
              </button>
            </li>
          </>
        ) : (
          <li><Link to="/signin">Sign In</Link></li>
        )}
      </ul>
    </nav>
  );
}
