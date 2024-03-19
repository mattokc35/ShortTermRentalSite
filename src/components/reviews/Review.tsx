import React, { FC } from "react";
import "./Review.css";

interface ReviewProps {
  rating: number;
  text: string;
  name: string;
  date: string;
}

const Review: FC<ReviewProps> = (props) => {
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
};

export default Review;
