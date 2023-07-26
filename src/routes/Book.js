import Navbar from "../components/Navbar";
import bookingImage from './../assets/sapphireindoors1.jpg'
import Intro from "../components/Intro";
import BookingInputForm from "../components/BookingInputForm";


function Book (){

    return(
        <>
        <Navbar></Navbar>
        <Intro
            cName = "intro-mid"
            introImg={bookingImage}
            title= "Book Now"
        />
        <BookingInputForm>

        </BookingInputForm>
            
        </>
    )
}

export default Book;