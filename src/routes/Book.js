import Navbar from "../components/Navbar";
import bookingImage from "./../assets/Kitchen_1b4_IMG_8630.jpg";
import Intro from "../components/Intro";
import BookingInputForm from "../components/BookingInputForm";
import Footer from "../components/Footer";
import "../App.css"

function Book() {
  return (
    <>
      <Navbar></Navbar>
      <Intro cName="intro-mid book-intro" introImg={bookingImage} title="Book Now" />
      <BookingInputForm />

      
    </>
  );
}

export default Book;
