import React from "react";
import "./Review.css"

function Review(props) {
  // Convert rating to an array of stars
  const stars = Array.from({ length: props.rating }, (_, index) => (
    <span key={index} className="star-icon">★</span>
  ));

  return (
    <div className="review">
      <div className="stars">{stars}</div>
      <p>{props.text}</p>
    </div>
  );
}

export default Review;