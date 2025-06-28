import React, { useState } from "react";
import "./ReviewForm.css";

export default function ReviewForm({ tourId, userId, onReviewSubmit }) {
  const [formData, setFormData] = useState({
    rating: "",
    comment: ""
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (!formData.rating || !formData.comment) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating: parseInt(formData.rating),
          comment: formData.comment,
          tour_id: tourId,
          user_id: userId
        })
      });

      if (response.ok) {
        setSuccess("Thank you for your review!");
        setFormData({ rating: "", comment: "" });
        if (onReviewSubmit) onReviewSubmit();
      } else {
        let errorMsg = "Failed to submit review.";
        try {
          const data = await response.json();
          errorMsg = data.error || errorMsg;
        } catch {
        }
        setError(errorMsg);
      }
    } catch (err) {
      setError("Network error. Please check your server.");
    }
  };

  return (
    <section className="review-section">
      <h2>Leave a Review</h2>
      <form className="review-form" onSubmit={handleSubmit}>
        <select name="rating" value={formData.rating} onChange={handleChange}>
          <option value="">Rating</option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n} Star{n > 1 && "s"}
            </option>
          ))}
        </select>
        <textarea
          name="comment"
          placeholder="Write your review here..."
          value={formData.comment}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Submit Review</button>
        {success && <p className="success-msg">{success}</p>}
        {error && <p className="form-error">{error}</p>}
      </form>
    </section>
  );
}