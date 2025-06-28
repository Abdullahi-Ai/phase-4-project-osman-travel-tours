import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./BookingForm.css";

export default function BookingForm({ selectedTour, onClose }) {
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tourError, setTourError] = useState("");

  const FORMSPREE_ENDPOINT = "https://formspree.io/f/mgvyrzel";
  const BACKEND_BOOKING_API = "http://127.0.0.1:5000/api/bookings";

  useEffect(() => {
    if (!selectedTour || !selectedTour.id) {
      setTourError("Tour information is missing.");
    } else {
      setTourError("");
    }
  }, [selectedTour]);

  useEffect(() => {
    if (bookingSuccess) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [bookingSuccess, onClose]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    phone_number: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
    message: Yup.string()
      .min(10, "Message must be at least 10 characters")
      .required("Message is required"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting, setStatus }) => {
    setLoading(true);
    const userId = localStorage.getItem("user_id");

    if (!userId) {
      setStatus("You must be logged in to book.");
      setLoading(false);
      return;
    }

    if (!selectedTour || !selectedTour.id) {
      setStatus("Tour information is missing.");
      setLoading(false);
      return;
    }

    try {
      // 1. Submit to Formspree (optional external notification)
      const formspreeRes = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          message: `Phone: ${values.phone_number}\nTour: ${selectedTour.name}\n${values.message}`,
        }),
      });

      const formspreeData = await formspreeRes.json();
      if (!formspreeRes.ok) {
        setStatus(formspreeData?.error || "Error submitting to Formspree.");
        setLoading(false);
        return;
      }

      // 2. Submit to your Flask backend
      const bookingRes = await fetch(BACKEND_BOOKING_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: new Date().toISOString().split("T")[0],
          user_id: parseInt(userId),
          tour_id: Number(selectedTour.id),
          phone_number: values.phone_number, // ✅ Important field for backend
        }),
      });

      const bookingData = await bookingRes.json();
      if (!bookingRes.ok) {
        setStatus(bookingData?.error || "Error saving booking.");
        setLoading(false);
        return;
      }

      setBookingSuccess(true);
      resetForm();
      setStatus("");
    } catch (error) {
      console.error("Booking error:", error);
      setStatus("Network error. Please try again.");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  if (!selectedTour || !selectedTour.id) {
    return (
      <div className="tour-modal-overlay" onClick={onClose}>
        <div className="tour-modal" onClick={(e) => e.stopPropagation()}>
          <button className="close-modal-btn" onClick={onClose}>&times;</button>
          <div className="form-error">
            {tourError || "Tour information is missing."}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tour-modal-overlay" onClick={onClose}>
      <div className="tour-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal-btn" onClick={onClose}>&times;</button>
        <h3>{selectedTour?.name || "Tour Not Found"}</h3>
        <p className="booking-subtitle">Fill the form to book your trip</p>

        {bookingSuccess ? (
          <div className="success-msg">
            Booking submitted successfully! We'll contact you soon.
          </div>
        ) : (
          <Formik
            initialValues={{ name: "", email: "", phone_number: "", message: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ status }) => (
              <Form className="booking-form">
                <Field name="name" placeholder="Your Name" />
                <ErrorMessage name="name" component="div" className="form-error" />

                <Field type="email" name="email" placeholder="Your Email" />
                <ErrorMessage name="email" component="div" className="form-error" />

                <Field name="phone_number" placeholder="Phone Number (10 digits)" />
                <ErrorMessage name="phone_number" component="div" className="form-error" />

                <Field
                  as="textarea"
                  name="message"
                  placeholder={`Message (e.g. I would like to book for this trip to ${selectedTour?.name || "..."})`}
                  rows={4}
                />
                <ErrorMessage name="message" component="div" className="form-error" />

                <button type="submit" className="book-now-btn" disabled={loading}>
                  {loading ? "Sending..." : "Book Now"}
                </button>

                {status && <div className="form-error">{status}</div>}
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
}
