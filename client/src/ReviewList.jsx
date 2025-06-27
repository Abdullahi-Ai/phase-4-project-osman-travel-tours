import React from "react";
import "./ReviewList.css";

export default function ReviewList({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return null; 
  }

  return (
    <section className="review-list">
      <h3>What others are saying:</h3>
      {reviews.map((review) => (
        <div key={review.id} className="review-item">
          <p><strong>{review.user_name || `User ${review.user_id}`}</strong></p>
          <p>Rating: {review.rating}</p>
          <p>{review.comment}</p>
        </div>
      ))}
    </section>
  );
}
