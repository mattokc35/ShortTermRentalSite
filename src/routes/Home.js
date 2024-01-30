import Intro from "../components/Intro";
import Navbar from "../components/Navbar";
import HomeImage from "./../assets/beachpic.jpg";
import "../App.css";
import Footer from "../components/footer/Footer";
import BookingInputForm from "../components/BookingInputForm";
import ContactForm from "../components/ContactForm";
import Divider from "../components/divider/Divider";
import React, { useRef, useMemo } from "react";
import "./Home.css";
import About from "../components/about/About";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { carouselImages } from "../constants/constants";
import { Amenities, reviews } from "../constants/constants";
import YouTubeEmbed from "../components/YoutubeEmbed";
import Review from "../components/reviews/Review";

function Home() {
  const homeRef = useRef(null);
  const bookNowRef = useRef(null);
  const contactFormRef = useRef(null);
  // Memoize carouselImages and Amenities
  const memoizedCarouselImages = useMemo(() => carouselImages, []);
  const memoizedAmenities = useMemo(() => Amenities, []);
  const handleScroll = (ref) => {
    if (ref && ref.current) {
      window.scroll({
        top: ref.current.offsetTop,
        behavior: "auto",
      });
    }
  };
  return (
    <>
      <Navbar
        handleScroll={(scrollID) => handleScroll(scrollID)}
        homeRef={homeRef}
        bookNowRef={bookNowRef}
        contactFormRef={contactFormRef}
      ></Navbar>
      <Intro
        homeRef={homeRef}
        handleScroll={(scrollID) => handleScroll(scrollID)}
        bookNowRef={bookNowRef}
        id="home"
        cName="intro-mid"
        introImg={HomeImage}
        title="Sapphire By The Sea"
        text="A pristine luxury beach cabin for creating unforgettable memories..."
        buttonText="Book Now"
        url="/"
        btnClass="show"
      />
      <br />
      <br />
      <div className="amenities-section">
        <h4>
          Introducing Sapphire by the Sea, an immaculate luxury beach house that
          has been recently constructed in 2022! It is equipped with everything
          you need to make unforgettable memories. Just a short 5-minute walk to
          the sands of Crystal Beach and more!
        </h4>
      </div>
      <Divider ref={bookNowRef} id="book-now" title="Photo Gallery and Book" />
      <div className="book-and-photos">
        <div className="carousel-section">
          <Carousel showIndicators={false} className="carousel">
            {memoizedCarouselImages.map(function (object, i) {
              return (
                <div key={object.caption}>
                  {" "}
                  <img src={object.src} loading="lazy" />{" "}
                  <p>{object.caption}</p>{" "}
                </div>
              );
            })}
          </Carousel>
        </div>
        <div className="booking-input-form">
          <BookingInputForm />
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <Divider title="Amenities" />
      <div className="amenities-section">
        <ul>
          {memoizedAmenities.map(function (object, i) {
            return <li key={i}>{object}</li>;
          })}
        </ul>
      </div>
      {/* 
      <Divider title="Video Tour" />
      <div className="video-section">
        <br></br>

        <div className="YoutubeEmbed2">
          <YouTubeEmbed></YouTubeEmbed>
        </div>
      </div>
*/}
      <Divider title="Customer Reviews" />
      <div className="reviews-section">
        <h6 className="recentGuestReviews">
          (5.0 Star Average Rating on Airbnb with over 40 reviews as of January
          2024)
        </h6>
        <Carousel
          className="reviews-carousel"
          showThumbs={false}
          showArrows={true}
          dynamicHeight={false}
        >
          {reviews.map((review, index) => (
            <div key={index} loading="lazy">
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
      <Divider ref={contactFormRef} id="contact-form" title="Contact Form" />
      <div className="contact-form">
        <ContactForm />
      </div>
      <br />
      <Footer></Footer>
    </>
  );
}

export default Home;
