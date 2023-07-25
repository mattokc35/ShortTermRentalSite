import Navbar from "../components/Navbar";
import bookingImage from './../assets/sapphireindoors1.jpg'
import Intro from "../components/Intro";


function Book (){

    return(
        <>
        <Navbar></Navbar>
        <Intro
            cName = "intro-mid"
            introImg={bookingImage}
            title= "Book Now"
        />
            
        </>
    )
}

export default Book;