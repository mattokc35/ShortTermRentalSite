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
import { reviews } from "../constants/constants";
import YouTubeEmbed from "../components/YoutubeEmbed";
import Review from "../components/reviews/Review";
import AmenitiesTable from "../components/AmenitiesTable";

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
        introImg={HomeImage}
        title="Sapphire By The Sea"
        text="A pristine luxury beach cabin for creating unforgettable memories..."
        buttonText="Book Now"
        url="/"
        btnClass="show"
      />
      <br />
      <div className="site-content">
        <div className="amenities-section">
          <h4>
            Introducing Sapphire by the Sea, an immaculate luxury beach house
            that has been recently constructed in 2022! It is equipped with
            everything you need to make unforgettable memories. Just a short
            5-minute walk to the sands of Crystal Beach and more!
          </h4>
        </div>
        <br />

        <Divider ref={bookNowRef} id="book-now" title="Book Now" />
        <div className="book-and-photos">
          <div className="booking-input-form">
            <BookingInputForm />
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <Divider title="Photo Gallery" />
        <br />
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
          <br></br>
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
        <br></br>
        <div className="reviews-section">
          <h6 className="recentGuestReviews">
            (5.0 Star Average Rating on Airbnb with over 40 reviews as of
            January 2024)
          </h6>
          <Carousel
            className="reviews-carousel"
            showArrows={true}
            showIndicators={false}
            dynamicHeight={true}
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
        <br></br>
        <div className="about-section">
          <About />
        </div>
        <br></br>
        <Divider ref={contactFormRef} id="contact-form" title="Contact Form" />
        <br></br>
        <div className="contact-form">
          <ContactForm />
        </div>
        <br />
      </div>
      <Footer></Footer>
    </>
  );
}

export default Home;
