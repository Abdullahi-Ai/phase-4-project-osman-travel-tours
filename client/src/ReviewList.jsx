import React from "react";
import "./ReviewList.css";

export default function ReviewList({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return (
      <section className="review-list">
        <p className="no-reviews">No reviews yet. Be the first to share your experience!</p>
      </section>
    );
  }

  return (
    <section className="review-list">
      <h3>What others are saying:</h3>
      {reviews.map((review) => (
        <div key={review.id} className="review-item">
          <p className="review-name"><strong>{review.user_name || `User ${review.user_id}`}</strong></p>
          
          <p className="review-rating">
            {"★".repeat(review.rating)}{" "}
            <span className="rating-number">({review.rating})</span>
          </p>
          
          <p className="review-comment">{review.comment}</p>
          
          {review.created_at && (
            <p className="review-date">
              <small>{new Date(review.created_at).toLocaleDateString()}</small>
            </p>
          )}
        </div>
      ))}
    </section>
  );
}
