import Intro from "../components/Intro";
import Navbar from "../components/Navbar";
import HomeImage from './../assets/sapphireoutdoors3.jpg'
import Footer from "../components/Footer";
import "../App.css"


import "../App.css"
function Home() {
  return (
    <>
      <Navbar></Navbar>
      <Intro
        cname="intro"
        introImg={HomeImage}
        title="Sapphire By The Sea"
        text="Short term rental beachhouse in Bolivar Peninsula, Crystal Beach, Texas (77650). "
        buttonText="Book Now"
        url="/book"
        btnClass="show"
      ></Intro>
     
      
    </>
  );
}

export default Home;
