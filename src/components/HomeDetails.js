import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { carouselImages } from "../constants/constants";
import { Amenities } from "../constants/constants";
import "./HomeDetails.css";
import YouTubeEmbed from "./YoutubeEmbed";
import ContactForm from "./ContactForm";

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
        <ContactForm></ContactForm>
      </div>
      <br></br>
    </>
  );
}

export default HomeDetails;
