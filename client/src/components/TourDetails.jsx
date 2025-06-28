import React, { useEffect, useState } from "react";
import ReviewForm from "./ReviewForm";
import ReviewList from "../ReviewList";
import "./TourDetails.css";

export default function TourDetails({ tour, onClose, onBookNow, user }) {
  const [tourReviews, setTourReviews] = useState([]);

  useEffect(() => {
    if (tour?.id) {
      fetch(`http://localhost:5000/api/tours/${tour.id}/reviews`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch reviews");
          }
          return res.json();
        })
        .then((data) => setTourReviews(data))
        .catch((err) => console.error("Failed to load reviews", err));
    }
  }, [tour]);

  const handleReviewSubmit = () => {
    fetch(`http://localhost:5000/api/tours/${tour.id}/reviews`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch updated reviews");
        }
        return res.json();
      })
      .then((data) => setTourReviews(data))
      .catch((err) => console.error("Error fetching updated reviews", err));
  };

  if (!tour) return null;

  return (
    <div className="tour-modal-overlay" onClick={onClose}>
      <div className="tour-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal-btn" onClick={onClose}>
          &times;
        </button>

        <div className="tour-details-content">
          <img
            src={tour.image}
            alt={tour.name}
            className="tour-details-img"
          />

          <h3>{tour.name}</h3>

          <div className="tour-payment">
            <p><b>Kenya Citizen:</b> {tour.payment?.citizen}</p>
            <p><b>Non-citizen:</b> {tour.payment?.nonCitizen}</p>
          </div>

          <p className="tour-description">{tour.long}</p>

          <button className="book-now-btn" onClick={onBookNow}>
            Book Now With Us
          </button>

          {user && (
            <ReviewForm
              tourId={tour.id}
              userId={user.id}
              onReviewSubmit={handleReviewSubmit}
            />
          )}

          <ReviewList reviews={tourReviews} />
        </div>
      </div>
    </div>
  );
}
