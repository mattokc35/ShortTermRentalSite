import Intro from "../components/Intro";
import Navbar from "../components/Navbar";
import contactImage from "./../assets/livingroom2.jpg";
import Footer from "../components/Footer";
import "../App.css";
import ContactForm from "../components/ContactForm";

function Contact() {
  return (
    <>
      <Navbar></Navbar>
      <Intro cName="intro-mid" introImg={contactImage} title="Contact Us" />
      <ContactForm />
    </>
  );
}

export default Contact;
