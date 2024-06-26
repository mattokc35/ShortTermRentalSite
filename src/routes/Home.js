import Intro from "../components/Intro";
import Navbar from "../components/Navbar";
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
import { reviews } from "../constants/constants";
import YouTubeEmbed from "../components/YoutubeEmbed";
import Review from "../components/reviews/Review";
import AmenitiesTable from "../components/AmenitiesTable";
import LocationMap from "../components/locationMap/LocationMap";
import ImageGallery from "../components/imageGallery/ImageGallery";

function Home() {
  const homeRef = useRef(null);
  const bookNowRef = useRef(null);
  const contactFormRef = useRef(null);
  const amenitiesRef = useRef(null);
  const aboutRef = useRef(null);
  const reviewsRef = useRef(null);
  const videoRef = useRef(null);
  // Memoize carouselImages and Amenities
  const memoizedCarouselImages = useMemo(() => carouselImages, []);
  const handleScroll = (ref, offset = 100) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "auto", block: "start" });
      window.scrollBy(0, -offset);
    }
  };
  return (
    <>
      <Navbar
        handleScroll={(scrollID) => handleScroll(scrollID)}
        homeRef={homeRef}
        bookNowRef={bookNowRef}
        contactFormRef={contactFormRef}
        amenitiesRef={amenitiesRef}
        aboutRef={aboutRef}
        reviewsRef={reviewsRef}
        videoRef={videoRef}
      ></Navbar>
      <Intro
        ref={homeRef}
        handleScroll={(scrollID) => handleScroll(scrollID)}
        bookNowRef={bookNowRef}
        id="home"
        cName="intro-mid"
        title="Sapphire By The Sea"
        text="A pristine luxury beach cabin for creating unforgettable memories..."
        buttonText="Book Now"
        url="/"
        btnClass="show"
      />
      <div className="site-content">
        <div className="amenities-section">
          <h4>
            Introducing Sapphire by the Sea, an immaculate luxury beach house
            that has been recently constructed in November 2022! It is equipped
            with everything you need to make unforgettable memories.
          </h4>
          <ImageGallery />
          <h4>
            We are located just a short 5-minute walk to the sands of Crystal
            Beach and more!
          </h4>
          <LocationMap />
        </div>
        <Divider ref={bookNowRef} id="book-now" title="Book Now" />
        <div className="book-and-photos">
          <div className="booking-input-form">
            <BookingInputForm />
          </div>
        </div>
        <Divider title="Photo Gallery" />
        <div className="carousel-section">
          <Carousel
            showIndicators={false}
            showThumbs={false}
            className="carousel"
            infiniteLoop={true}
            centerMode={false}
            preventMovementUntilSwipeScrollTolerance={true}
            swipeScrollTolerance={50}
          >
            {memoizedCarouselImages.map(function (object, i) {
              return (
                <div key={object.caption}>
                  {" "}
                  <img
                    src={object.src}
                    loading="lazy"
                    alt={object.caption}
                  />{" "}
                  {/* <p>{object.caption}</p>{" "}*/}
                </div>
              );
            })}
          </Carousel>
        </div>
        <Divider title="Amenities" ref={amenitiesRef} />
        <AmenitiesTable />
        <Divider ref={videoRef} title="Video Tour" />
        <div className="video-section">
          <div className="YoutubeEmbed2">
            <YouTubeEmbed></YouTubeEmbed>
          </div>
        </div>
        <Divider ref={reviewsRef} title="Customer Reviews" />
        <div className="reviews-section">
          <h6 className="recentGuestReviews">
            (5.0 Star Average Rating on Airbnb and Vrbo with over 45 reviews as
            of March 2024)
          </h6>
          <Carousel
            className="reviews-carousel"
            showArrows={true}
            showIndicators={false}
            dynamicHeight={true}
            showThumbs={false}
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
        <Divider ref={aboutRef} title="About The Host" />
        <div className="about-section">
          <About />
        </div>
        <Divider ref={contactFormRef} id="contact-form" title="Contact Form" />
        <div className="contact-form">
          <ContactForm />
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Home;
