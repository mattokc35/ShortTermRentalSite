import Intro from "../components/Intro";
import Navbar from "../components/Navbar";
import HomeImage from "./../assets/beachpic.jpg";
import "../App.css";
import HomeDetails from "../components/HomeDetails";
import Footer from "../components/footer/Footer";
import BookingInputForm from "../components/BookingInputForm";
import ContactForm from "../components/ContactForm";
import Divider from "../components/divider/Divider";

function Home() {
  return (
    <>
      <Navbar></Navbar>
      <Intro
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
      <Divider title="Book Now" />
      <BookingInputForm />
      <br />
      <br/>
      <br />
      <br />
      <br />
      <Divider title="Contact Form" />
      <ContactForm/>
      <br/>
      <br />
      <Footer></Footer>
    </>
  );
}

export default Home;
