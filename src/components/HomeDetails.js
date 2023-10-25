import React, { useState } from "react";
import About from "./about/About";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { carouselImages } from "../constants/constants";
import { Amenities, reviews } from "../constants/constants";
import "./HomeDetails.css";
import YouTubeEmbed from "./YoutubeEmbed";
import Review from "./reviews/Review";

function HomeDetails() {
  return (
    <>
      <h3>Welcome to our beautiful home...</h3>
      <div className="homeDetails">
        <div className="carousel-section">
          <Carousel showIndicators={false} className="carousel">
            {carouselImages.map(function (object, i) {
              return (
                <div>
                  {" "}
                  <img src={object.src} /> <p>{object.caption}</p>{" "}
                </div>
              );
            })}
          </Carousel>
        </div>
        <div className="amenities-section">
          <h4>
            Introducing Sapphire by the Sea, an immaculate luxury beach house
            that has been recently constructed in 2022! It is equipped with
            everything you need to make unforgettable memories. Just a short
            5-minute walk to the sands of Crystal Beach and more!
          </h4>
          <ul>
            {Amenities.map(function (object, i) {
              return <li>{object}</li>;
            })}
          </ul>
        </div>
      </div>
      <div className="video-section">
        <br></br>

        <div className="YoutubeEmbed2">
          <h3>Check out a video tour below!</h3>
          <YouTubeEmbed></YouTubeEmbed>
        </div>
      </div>

      <div className="reviews-section">
        <h3 className="recentGuestReviews">Recent Guest Reviews </h3>
        <h6 className="recentGuestReviews">
          (5.0 Star Average Rating on Airbnb as of September 2023)
        </h6>
        <Carousel
          className="reviews-carousel"
          showThumbs={false}
          showArrows={true}
          dynamicHeight={false}
        >
          {reviews.map((review, index) => (
            <div key={index}>
              {/* Use the Review component with all properties */}
              <Review
                text={review.text}
                rating={review.rating}
                name={review.name}
                date={review.date}
              />
            </div>
          ))}
        </Carousel>
      </div>
      <br></br>
      <div className="about-section">
        <About />
      </div>
      <br></br>
    </>
  );
}

export default HomeDetails;
