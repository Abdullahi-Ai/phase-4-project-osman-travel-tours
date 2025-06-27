import React, { useState } from "react";
import TOURS from "./TOURS";
import "./SafariPackages.css";
import TourDetails from "./TourDetails"; 

export default function SafariPackages({ user }) {
  const [selectedTour, setSelectedTour] = useState(null);

  return (
    <div className="safari-packages-page">
      <h1>Safari Packages</h1>
      <p className="safari-intro">
        Explore our most popular safari destinations — offering you unforgettable wildlife experiences, coastal escapes, and mountain adventures.
      </p>

      <div className="safari-grid">
        {TOURS.map((tour) => (
          <div key={tour.key} className="safari-card">
            <img src={tour.image} alt={tour.name} className="safari-img" />
            <h2>{tour.name}</h2>
            <p className="safari-short">{tour.short}</p>
            <div className="safari-payment">
              <p><strong>Citizen:</strong> {tour.payment.citizen}</p>
              <p><strong>Non-Citizen:</strong> {tour.payment.nonCitizen}</p>
            </div>
            <button
              className="learn-more-btn"
              onClick={() => setSelectedTour(tour)}
            >
              Learn More
            </button>
          </div>
        ))}
      </div>

      {selectedTour && (
        <TourDetails
          tour={selectedTour}
          onClose={() => setSelectedTour(null)}
          onBookNow={() => alert("Booking feature coming soon!")}
          user={user}
        />
      )}
    </div>
  );
}
