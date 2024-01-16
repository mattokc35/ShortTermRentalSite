import Intro from "../components/Intro";
import Navbar from "../components/Navbar";
import HomeImage from "./../assets/beachpic.jpg";
import "../App.css";
import HomeDetails from "../components/HomeDetails";
import Footer from "../components/footer/Footer";
import BookingInputForm from "../components/BookingInputForm";
import ContactForm from "../components/ContactForm";
import Divider from "../components/divider/Divider";
import React, { useRef } from "react";

function Home() {
  const homeRef = useRef(null);
  const bookNowRef = useRef(null);
  const contactFormRef = useRef(null);
  const handleScroll = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
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
      <HomeDetails />
      <br />
      <Divider ref={bookNowRef} id="book-now" title="Book Now" />
      <BookingInputForm />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Divider ref={contactFormRef} id="contact-form" title="Contact Form" />
      <ContactForm />
      <br />
      <br />
      <Footer></Footer>
    </>
  );
}

export default Home;
