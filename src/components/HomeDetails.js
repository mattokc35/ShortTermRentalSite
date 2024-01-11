import React, { useState } from "react";
import About from "./about/About";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { carouselImages } from "../constants/constants";
import { Amenities, reviews } from "../constants/constants";
import "./HomeDetails.css";
import YouTubeEmbed from "./YoutubeEmbed";
import Review from "./reviews/Review";
import Divider from "./divider/Divider";

function HomeDetails() {
  return (
    <>
      <div className="homeDetails">
        <Divider title="Photos and Amenities" />
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
      <Divider title="Video Tour" />
      <div className="video-section">
        <br></br>

        <div className="YoutubeEmbed2">
          <YouTubeEmbed></YouTubeEmbed>
        </div>
      </div>
      <Divider title="Customer Reviews" />
      <div className="reviews-section">
        <h6 className="recentGuestReviews">
          (5.0 Star Average Rating on Airbnb with over 40 reviews as of January 2024)
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
      <Divider title="About The Host" />
      <div className="about-section">
        <About />
      </div>
      <br></br>
    </>
  );
}

export default HomeDetails;
