import React from "react";
import "./Review.css";

function Review(props) {
  // Convert rating to an array of stars
  const stars = Array.from({ length: props.rating }, (_, index) => (
    <span key={index} className="star-icon">
      ★
    </span>
  ));

  return (
    <div className="review">
      <br />
      <div className="stars">{stars}</div>
      <p>{props.text}</p>
      <br />
      <div className="review-details">
        <span className="review-name">-{props.name}</span>,{" "}
        <span className="review-date">{props.date}</span>
        <br></br>
      </div>
    </div>
  );
}

export default Review;
