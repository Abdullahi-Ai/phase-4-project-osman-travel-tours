import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";

export default function SignIn({ setUser }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");


    const email = form.email.trim().toLowerCase();
    const password = form.password.trim();
    const confirmPassword = form.confirmPassword.trim();
    const firstName = form.firstName.trim();

    if (isSignUp) {
      if (!firstName || !email || !password || !confirmPassword) {
        setError("Please fill in all fields.");
        return;
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      try {
        const response = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: firstName, email, password }),
        });

        if (response.ok) {
          alert("Registration successful! You can now sign in.");
          setIsSignUp(false);
          setForm({
            firstName: "",
            email,
            password: "",
            confirmPassword: "",
          });
        } else {
          const data = await response.json();
          if (data.error === "Email already registered") {
            setError("This email is already in use. Please sign in instead.");
          } else {
            setError(data.error || "Registration failed.");
          }
        }
      } catch (err) {
        setError("Network error during registration.");
      }
      return;
    }

    
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const user = await response.json();
        setUser(user);

        localStorage.setItem("user_id", user.id);
        localStorage.setItem("user_name", user.name);
        localStorage.setItem("user_email", user.email);

        navigate("/");
      } else {
        const data = await response.json();
        setError(data.error || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError("Network error during login.");
    }
  };

  return (
    <div className="signin-page">
      <h1>{isSignUp ? "Sign Up" : "Sign In"}</h1>
      <form className="signin-form" onSubmit={handleSubmit}>
        {isSignUp && (
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            autoComplete="given-name"
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          autoComplete="email"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          autoComplete={isSignUp ? "new-password" : "current-password"}
        />
        {isSignUp && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
          />
        )}
        {error && <div className="form-error">{error}</div>}
        <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
        <div className="switch-auth-mode">
          {isSignUp ? (
            <>
              Already have an account?{" "}
              <button type="button" onClick={() => setIsSignUp(false)} className="switch-link">
                Sign In
              </button>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <button type="button" onClick={() => setIsSignUp(true)} className="switch-link">
                Sign Up
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
