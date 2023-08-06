import Intro from "../components/Intro";
import Navbar from "../components/Navbar";
import contactImage from "./../assets/sapphireindoors2.jpg";
import Footer from "../components/Footer";
import "../App.css";

function Contact() {
  return (
    <>
      <Navbar></Navbar>
      <Intro cName="intro-mid" introImg={contactImage} title="Contact Us" />
     
    </>
  );
}

export default Contact;
